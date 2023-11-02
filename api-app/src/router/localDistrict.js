const express = require('express');
const router = express.Router();
const axios = require('axios');
const properties = require('../config/properties');
const moment = require("moment");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


// 소유 및 기타정보 [ 국가공간 - 토지소유정보속성조회 REST API ]
const re1Fn = (authkey, pnu, stdrYear, format, numOfRows, pageNo) => {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();     
        let HttpUrl = "http://openapi.nsdi.go.kr/nsdi/PossessionService/attr/getPossessionAttr"; /*URL*/     
        let parameter = '?' + encodeURIComponent("authkey") +"="+encodeURIComponent(authkey); /*authkey Key*/     
        parameter += "&" + encodeURIComponent("pnu") + "=" + encodeURIComponent(pnu); /* 고유번호(8자리 이상) */  
        parameter += "&" + encodeURIComponent("format") + "=" + encodeURIComponent(format); /* 응답결과 형식(xml 또는 json) */  
        parameter += "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent(numOfRows); /* 검색건수 */  
        parameter += "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent(pageNo); /* 페이지 번호 */  
        xhr.open('GET', HttpUrl + parameter);     
        xhr.send();
        xhr.onreadystatechange = function () {     
            if (this.readyState == 4 && this.status == 200) {     
                let jsonData = JSON.parse(this.responseText);
                let rs = jsonData[Object.keys(jsonData)];
                resolve(rs);
            }
        };     
    });
}

// 소유 및 기타정보 [ 국가공간 - 개별공시지가속성조회 REST API ]
const re2Fn = (authkey, pnu, stdrYear, format, numOfRows, pageNo) => {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();     
        let HttpUrl = "http://openapi.nsdi.go.kr/nsdi/IndvdLandPriceService/attr/getIndvdLandPriceAttr"; /*URL*/     
        let parameter = '?' + encodeURIComponent("authkey") +"="+encodeURIComponent(authkey); /*authkey Key*/     
        parameter += "&" + encodeURIComponent("pnu") + "=" + encodeURIComponent(pnu); /* 고유번호(8자리 이상) */  
        parameter += "&" + encodeURIComponent("stdrYear") + "=" + encodeURIComponent(stdrYear); /* 기준연도(YYYY: 4자리) */  
        parameter += "&" + encodeURIComponent("format") + "=" + encodeURIComponent(format); /* 응답결과 형식(xml 또는 json) */  
        parameter += "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent(numOfRows); /* 검색건수 */  
        parameter += "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent(pageNo); /* 페이지 번호 */ 
        xhr.open('GET', HttpUrl + parameter);     
        xhr.send();
        xhr.onreadystatechange = function () {     
            if (this.readyState == 4 && this.status == 200) {     
                let jsonData = JSON.parse(this.responseText);
                let rs = jsonData[Object.keys(jsonData)];
                resolve(rs);
            }
        };     
    });
}

// 건축물 정보 [ 공공데이터포털 - 국토교통부_건축물대장 표제부 조회 ]
const re3Fn = (key, sigunguCd, bjdongCd, bun, ji, platGbCd, _type) => {
    return new Promise((resolve, reject) => {
        let url = `https://apis.data.go.kr/1613000/BldRgstService_v2/getBrTitleInfo`;
        let queryParams = '?' + encodeURIComponent('serviceKey') + `=${key}`; /* Service Key*/
            queryParams += '&' + encodeURIComponent('sigunguCd') + '=' + encodeURIComponent(sigunguCd); /* */
            queryParams += '&' + encodeURIComponent('bjdongCd') + '=' + encodeURIComponent(bjdongCd); /* */
            queryParams += '&' + encodeURIComponent('platGbCd') + '=' + encodeURIComponent(platGbCd); /* */
            queryParams += '&' + encodeURIComponent('bun') + '=' + encodeURIComponent(bun); /* */
            queryParams += '&' + encodeURIComponent('ji') + '=' + encodeURIComponent(ji); /* */
            queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /* */
            queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
            
            // queryParams += '&' + encodeURIComponent('startDate') + '=' + encodeURIComponent(''); /* */
            // queryParams += '&' + encodeURIComponent('endDate') + '=' + encodeURIComponent(''); /* */
        axios.get(url + queryParams,{
            headers: {
                'Content-Type' : 'application/xml;charset=UTF-8'
            }
        })
        .then((ress) => {
            // console.log(ress.data);
            resolve(ress.data);
        })
        .catch((err) => {
            console.log(err);
            reject(err);
        })
    });
}
// 소유 및 기타정보 조회
// 토지소유정보속성조회, 개별공시지가속성조회
router.get('/searchA', async (req, res) => {
    console.log("토지소유정보속성조회");
    // let aa = encodeURI(`http://openapi.nsdi.go.kr/nsdi/PossessionService/attr/getPossessionAttr?numOfRows=${numOfRows}&pageNo=${pageNo}&pnu=${pnu}&format=${format}&authkey=${authkey}`);
    try {
        let pnu = req.session.pnu;
        let stdrYear = "2023";
        let format = "json";
        let numOfRows = "10";
        let pageNo = "1";


        let possessionKey = properties.possessionKey;
        // 토지소유정보속성조회
        let rs1 = await re1Fn(possessionKey, pnu, stdrYear, format, numOfRows, pageNo);
        
        let indvdLandKey = properties.indvdLandKey;
        // 개별공시지가속성조회
        let rs2 = await re2Fn(indvdLandKey, pnu, stdrYear, format, numOfRows, pageNo);



        if((rs1.field).length <= 0) {
            return res.status(209).send("0");
        }
        let rs1_d = rs1.field[0];
        let rs2_d = rs2.field[0];

        // 필요한 속성
        let rstDataKeys = [
            'posesnSeCodeNm',
            'ownshipChgDe',
            'ownshipChgCauseCodeNm',
            'cnrsPsnCo',
            'pblntfPclnd',
            'pblntfDe'
        ];
        let rstData = {};

        for (let i = 0; i < rstDataKeys.length; i++) {
            if(i == rstDataKeys.length -2) {
                rstData[rstDataKeys[i]] = rs2_d[rstDataKeys[i]];
            }else {
                rstData[rstDataKeys[i]] = rs1_d[rstDataKeys[i]];
            }

            if(i == rstDataKeys.length -1 ) {
                rstData[rstDataKeys[i]] = rs2_d[rstDataKeys[i]];
                break;
            }
        }
        return res.status(200).json(rstData);
    } catch (error) {
        console.log("소유 및 기타정보 ERROR");
        console.log(error);
        return res.status(409).json({ error : error.message });
    }
});

// 건축물 정보
// 공공데이터포털 - 국토교통부_건축물대장 표제부 조회
router.get('/searchB', async (req, res)=> {
    
    try {
        let key = properties.bldKey;
        let pnu = req.session.pnu;
        let sigunguCd = "46810"; // 시군구코드-행정표준코드
        let bjdongCd = "25022"; // 법정동코드-행정표준코드
        let bun = "0170"; // 번-번지
        let ji = "0001" // 지-번지
        let platGbCd = "0"; // 대지구분코드
        let _type = "json";

        let re = await re3Fn(key, sigunguCd, bjdongCd, bun, ji, platGbCd, _type);

        if((re.response.body.items.item).length <= 0) {
            return res.status(209).send("0");
        }
        let rsNameList = [ 'cnt','archArea','mainPurpsCdNm','etcPurps','pmsDay'];
        let rsInfo= {
            'cnt':0,
            'archArea':0,
            'mainPurpsCdNm': [],
            'etcPurps':[],
            'pmsDay' : ""
        };
        let rsData = re.response.body.items.item;
        rsInfo['cnt'] = re.response.body.totalCount;
        rsData.some((el, index) => {
            rsInfo['archArea'] = Number(rsInfo['archArea']) + Number(el.archArea);
            rsInfo['mainPurpsCdNm'].push(el.mainPurpsCdNm);
            rsInfo['etcPurps'].push(el.etcPurps);
            rsInfo['pmsDay'] = moment(el.pmsDay, "YYYYMMDD").format("YYYY-MM-DD");
        });

        return res.status(200).json(rsInfo);

    } catch (error) {
        console.log("건축물 정보 ERROR");
        console.log(error);
        return res.status(409).json({
            error : error
        });
    }
    
});



//  위는 구코드 =================================================================================================
//  아래 사용 =================================================================================================
//  =================================================================================================

// 소유 및 기타정보 조회 - 토지소유정보속성조회
router.post('/land-possession-service', async (req, res) => {
    try {
        let pnu = req.session.pnu;
        let stdrYear = req.body.stdrYear;
        let format = "json";
        let numOfRows = "10";
        let pageNo = "1";

        // 토지소유정보속성조회
        let possessionKey = properties.possessionKey;
        let rs1 = await re1Fn(possessionKey, pnu, stdrYear, format, numOfRows, pageNo);
        
        if((rs1.field).length <= 0) {
            return res.status(209).send("0");
        }
        let rs1_d = rs1.field[0];

        // 필요한 속성
        let rstDataKeys = [
            'posesnSeCodeNm',
            'ownshipChgDe',
            'ownshipChgCauseCodeNm',
            'cnrsPsnCo'
        ];
        let rstData = {};

        for (let i = 0; i < rstDataKeys.length; i++) {
            if(i == rstDataKeys.length -1 ) {
                rstData[rstDataKeys[i]] = rs1_d[rstDataKeys[i]];
                break;
            }
            rstData[rstDataKeys[i]] = rs1_d[rstDataKeys[i]];
        }
        return res.status(200).json(rstData);
    } catch (error) {
        console.log("소유 및 기타정보 - 개별공시가 ERROR");
        console.log(error);
        return res.status(409).json({
            error : error
        });
    }
});
// 소유 및 기타정보 조회 - 개별공시지가속성조회
router.post('/land-price-service', async (req, res) => {
    try {
        let pnu = req.session.pnu;
        let stdrYear = req.body.stdrYear;
        let format = "json";
        let numOfRows = "10";
        let pageNo = "1";

        // 개별공시지가속성조회
        let indvdLandKey = properties.indvdLandKey;
        let rs1 = await re2Fn(indvdLandKey, pnu, stdrYear, format, numOfRows, pageNo);


        if((rs1.field).length <= 0) {
            return res.status(209).send("0");
        }
        let rs1_d = rs1.field[0];

        // 필요한 속성
        let rstDataKeys = [
            'pblntfPclnd',
            'pblntfDe'
        ];
        let rstData = {};

        for (let i = 0; i < rstDataKeys.length; i++) {
            if(i == rstDataKeys.length -1 ) {
                rstData[rstDataKeys[i]] = rs1_d[rstDataKeys[i]];
                break;
            }
            rstData[rstDataKeys[i]] = rs1_d[rstDataKeys[i]];
        }
        return res.status(200).json(rstData);
    } catch (error) {
        console.log("소유 및 기타정보 ERROR");
        console.log(error);
        return res.status(409).json({
            error : error
        });
    }
});

// 건축물 정보 - 국토교통부_건축물대장 표제부 조회
router.post('/bld-rgst-service', async (req, res) => {

    
    try {

        let key = properties.bldKey;
        let pnu = req.session.pnu;
        let sigunguCd = req.body.sigunguCd;  // 시군구코드-행정표준코드
        let bjdongCd = req.body.bjdongCd;  // 법정동코드-행정표준코드
        let bun = req.body.bun;  // 번-번지
        let ji = req.body.ji;  // 지-번지
        let platGbCd = req.body.platGbCd;  // 대지구분코드
        let _type = "json";
        let re = await re3Fn(key, sigunguCd, bjdongCd, bun, ji, platGbCd, _type);

        if ((re.response.body.items.item).length <= 0) {
            return res.status(209).send("0");
        }
        let rsNameList = ['cnt', 'archArea', 'mainPurpsCdNm', 'etcPurps', 'pmsDay'];
        let rsInfo = {
            'cnt': 0, 
            'archArea': 0,
            'mainPurpsCdNm': [],
            'etcPurps': [],
            'pmsDay': ""
        };
        let rsData = re.response.body.items.item;
        rsInfo['cnt'] = re.response.body.totalCount;
        rsData.some((el, index) => {
            rsInfo['archArea'] = Number(rsInfo['archArea']) + Number(el.archArea);
            rsInfo['mainPurpsCdNm'].push(el.mainPurpsCdNm);
            rsInfo['etcPurps'].push(el.etcPurps);
            rsInfo['pmsDay'] = moment(el.pmsDay, "YYYYMMDD").format("YYYY-MM-DD");
        });

        return res.status(200).json(rsInfo);

    } catch (error) {
        console.log("건축물 정보 ERROR");
        console.log(error);
        return res.status(409).json({
            error: error
        });
    }
});


// eum에으로 요청
router.get('/getEum', async (req, res) => {
	console.log("getEum");
	try {
        let pnu = req.session.pnu;
        let authCd = "46810"
            // 한글 깨지는 현상 인코딩 하기
        let iconv = require('iconv-lite');
        let url = encodeURI(`https://www.eum.go.kr/web/ar/lu/luLandDetActPopAjax.jsp?luGrStr=발전시&ucodes=발전소로 사용되는 건축물&authCd=${authCd}&pnu=${pnu}`)
		let response = await axios.get(url, {
			responseType: 'arraybuffer',
		});

		let contentType = response.headers['content-type'];

		let charset = contentType.includes('charset=')
			? contentType.split('charset=')[1]
			: 'EUC-KR';

		let responseData = await response.data;

		let data = iconv.decode(responseData, charset);
		console.log("data :: " , typeof data);
		return res.send(data);
	} catch (error) {
		console.log("토지e음 조회");
		console.log(error);
		return;
	}


});



module.exports = router;