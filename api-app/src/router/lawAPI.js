const express = require('express');
const router = express.Router();
const axios = require('axios');
const properties = require('../config/properties');
const convert = require('xml-js');
const fs = require('fs');
const path = require('path');

const readFileCode = (name) => {
    let pathFiles2 = path.join(__dirname, '../webapp/public/assets');
    return new Promise((resovle, reject) => {
        fs.readFile(`${pathFiles2}/기관코드.json`, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            resovle(JSON.parse(data));
        });
    });
}

const searchData = (data, sel, text1, text2) => {
    return new Promise((resovle, reject) => {
        // foreach 는 브레이크가 없어서 계속 실행
        if(sel == 'lawSearch'){
            data.some((el, index) => {
                let a = el['전체기관명'].indexOf(text1);
                let a2 = el['최하위기관명'].indexOf(text2);
                if(a >= 0 && a2 >= 0) {
                    resovle(el);
                    return true;
                }
                if (index == data.length - 1) {
                    resovle("0");
                    return true;
                }   
            });
            // `{
            //     '기관코드': 3000000,
            //     '전체기관명': '서울특별시 종로구',
            //     '최하위기관명': '종로구',
            //     '폐지구분': '현존'
            // }`
        }
        if(sel == 'lawService'){
            data.some((el, index) => {
                let a = el['조내용']['_cdata'].indexOf(text1);
                if (a > 1) {
                    resovle(el);
                    return true;
                }
                if (index == data.length - 1) {
                    resovle("0");
                    return true;
                }   
            });
        }
    });




}
let oc = 'simjh7601';
// 국가법령정보(조례정보 목록-법규ID)
// 목록 조회는 기역정보를 받아서 실행하기 ( 지역정보면 받으면 서버단 은 끝)
router.get('/lawData_0', async (req, res) => {
    
    try {
        let pnu = req.session.pnu;

        // 도로명주소 데이터에서 지역명 파라미터 받기
        let code = await readFileCode();
        let a1 = await searchData(code.Sheet1, 'lawSearch', '전라남도', '전라남도');
        let a2 = await searchData(code.Sheet1, 'lawSearch', '전라남도 강진군', '강진군');
        // a1 ::  { '기관코드': 6460000, '전체기관명': '전라남도', '최하위기관명': '전라남도', '폐지구분': '현존' }
        // a2 ::  { '기관코드': 4920000, '전체기관명': '전라남도 강진군', '최하위기관명': '강진군', '폐지구분': '현존' }
        if(a1 == "0" || a2 == "0"){
            return res.status(409).send({ errorMsg: "NO Search Data" });
        }
        let type = `xml`;
        let knd = `30001`;
        let org = a1['기관코드'];
        let sborg = a2['기관코드']; 

        // 광역시/도/특별시 조례검색
        let query1 = `전라남도` + "도시계획"; // 도시계획(Default)
        let url1 = encodeURI(`https://www.law.go.kr/DRF/lawSearch.do?OC=simjh7601&target=ordin&query=${query1}&type=${type}&knd=${knd}&org=${org}`);
        let re1 = await axios.get(url1);
        
        // 구/군/시 조례검색
        let query2 = `강진군` + "도시계획";
        let url2 = encodeURI(`https://www.law.go.kr/DRF/lawSearch.do?OC=simjh7601&target=ordin&query=${query2}&type=${type}&knd=${knd}&org=${org}&sborg=${sborg}`);
        let re2 = await axios.get(url2);

        // XML => JSON 
        let jsonData1 =  JSON.parse( convert.xml2json(re1.data, {compact: true, spaces: 4}));
        let jsonData2 =  JSON.parse( convert.xml2json(re2.data, {compact: true, spaces: 4}));
        
        let jsonData1Cnt = Number(jsonData1.OrdinSearch.totalCnt['_text']);
        let jsonData2Cnt = Number(jsonData2.OrdinSearch.totalCnt['_text']);
        
        // 조회한 정보가 1개 또는 여러개 일 경우 
        // 1개면 배열에 담고, 여러개면 바로 담는다.
        let resultData = {};
        if(jsonData1Cnt > 1) { resultData.jsonData1 = jsonData1.OrdinSearch.law;}
        else { resultData.jsonData1 = [jsonData1.OrdinSearch.law];}
        if(jsonData2Cnt > 1) { resultData.jsonData2 = jsonData2.OrdinSearch.law;}
        else { resultData.jsonData2 = [jsonData2.OrdinSearch.law];}
        
        return res.status(200).json(resultData);
    } catch (error) {
        console.log("lawData_0 ERROR : ");
        // console.log(error);
        return res.status(600).send({ errorMsg: error.message });
    }
});

//  XML -> JSON 국가법령정보(자치법규 본문 조회) - 개발행위허가 기준
router.get('/lawData_1', async (req, res) => {
    try {
        let pnu = req.session.pnu;
        let type = 'xml';
        // let id = '2034124'; // 광주광역시 (태양광 내용 없음)
        let id = '2021499'; // 강진 (태양광 내용 있음)
        let url = encodeURI(`https://www.law.go.kr/DRF/lawService.do?OC=${oc}&target=ordin&type=${type}&ID=${id}`);

        let re = await axios.get(url);
        // console.log(re);
        let jsonData =  JSON.parse( convert.xml2json(re.data, {compact: true, spaces: 4}));
        let lawDataArr = jsonData.LawService['조문']['조'];
        let serarchText;
        serarchText = await searchData(lawDataArr, 'lawService', '태양광발전시설', "");
        return res.send(serarchText);
    } catch (error) {
        console.log("lawData_1 ERROR : ");
        console.log(error);
        return error;
    }
});


router.get('/getEum', async (req, res) => {
	console.log("getEum");
	try {
        let pnu = req.session.pnu;

        let authCd = "46810";
            // 한글 깨지는 현상 인코딩 하기
        let iconv = require('iconv-lite');
        let url = encodeURI(`https://www.eum.go.kr/web/ar/lu/luLandDetActPopAjax.jsp?luGrStr=발전시&ucodes=발전소로 사용되는 건축물&authCd=${authCd}&pnu=${pnu}`)
		// await axios({
		// 	method:"GET",
        //     url : url,
		// 	// headers: { 'Content-Type': 'text/html;charset=UTF-8'},
		// 	// headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
		// 	// Headers : {'Content-Type':'text/html;charset=UTF-8'}
		// 	headers : {'Content-Type':'text/html; charset=EUC-KR'}
		// })
		// .then((ress) => {
		// 	// replace(/^\s+|\s+$/gm, "")
		// 	console.log("");
		// 	console.log(ress.data);
		// 	return res.send(ress.data);
		// 	// console.log();
		// })
		// .catch(err => {
        //     console.log("getEum 에러에러 : "+err);
        // })

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







/* ===== 사용 XXXXX ===== */
// HTML -> JSON 국가법령정보(자치법규 본문 조회) - 개발행위허가 기준
// HTML로 조회 하면 iframe 링크로 넘어온다.
const HTMLParser = require('html-to-json-parser'); // CommonJS
const { log } = require('console');
router.get('/lawData_2', async (req, res) => {
    let type = 'HTML';
    let id = '2021499'; // 강진
    let url = encodeURI(`https://www.law.go.kr/DRF/lawService.do?OC=${oc}&target=ordin&type=${type}&ID=${id}`);
    try {
        let resData;
        await axios({
            method:"GET",
            url : url
        }).then( async (ress) => {
            // console.log("lawData_2 RESULT DATA : ");
            // console.log(ress);
            resData = ress.data;

            // let jsonData =  JSON.parse( convert.xml2json(ress.data, {compact: true, spaces: 4}));
            // let lawDataArr = jsonData.LawService['조문']['조'];
            // let serarchText;
            // lawDataArr.forEach((el, index) => {
            //     let a = el['조내용']['_cdata'].indexOf('태양광발전시설');
            //     if(a > 1) {
            //         serarchText = el;
            //         return res.json(serarchText);
            //     }

            // });
        })
        .catch((err) => {
            console.log("lawData_2 ERROR : ", err);
            return err;
        });
        // console.log(resData);
        let result = await HTMLParser(resData, true);
        // console.log(result);
    } catch (error) {
        console.log("lawData_1 ERROR : ");
        console.log(error);
        return error;
    }
});


router.get('/getEumJson', async (req, res) => {
	console.log("getEumJson");
	let authCd = "29200";
    // 한글 깨지는 현상 인코딩 하기
	let iconv = require('iconv-lite');
	let url = encodeURI(`https://www.eum.go.kr/web/ar/lu/luLandDetActPopAjax.jsp?luGrStr=발전시&ucodes=발전소로 사용되는 건축물&authCd=${authCd}&pnu=${pnu}`)
	try {
		let response = await axios.get(url, {
			responseType: 'arraybuffer',
		});

		let contentType = response.headers['content-type'];

		let charset = contentType.includes('charset=')
			? contentType.split('charset=')[1]
			: 'EUC-KR';

		let responseData = await response.data;

		let data = iconv.decode(responseData, charset);
		// console.log(data);
		return res.send(data);
	} catch (error) {
		console.log("토지e음 조회");
		console.log(error);
		return;
	}


});





//  저장된 xlsx파일 읽고 ⇒ json 변환 ⇒ json파일로 저장하기
router.get('/xlsxFile', async (req, res) => {
    const xlsx = require('xlsx');
    
    
    const resData = {};
    try {
        // console.log(__dirname);
        let pathFiles = path.join(__dirname, '../webapp/public/assets', '기관코드.xlsx');
        // let pathFiles = path.join('/', 'src', 'webapp', 'public', 'assets', '기관코드.xlsx');
        // console.log(pathFiles);
        const workbook = xlsx.readFile(pathFiles);
        const sheetnames = Object.keys(workbook.Sheets);
    
        let i = sheetnames.length;
    
        while (i--) {
            const sheetname = sheetnames[i];
            resData[sheetname] = xlsx.utils.sheet_to_json(workbook.Sheets[sheetname]);
        }
        console.log("xlsx 파일 읽기");
        // console.log(typeof resData);

        // return resData;
        let pathFiles2 = path.join(__dirname, '../webapp/public/assets');
        fs.writeFileSync(`${pathFiles2}/기관코드.json`,  JSON.stringify(resData));
    } catch (error) {
        console.log("xlsx 파일 ERROR");
        console.log(error);
    }

    
});







module.exports = router;