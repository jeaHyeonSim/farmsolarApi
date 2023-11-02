const express = require('express');
const router = express.Router();
const axios = require('axios');
const properties = require('../config/properties');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const convert = require('xml-js');
const fs = require('fs');
const path = require('path');




// 국가공간 - 토지특성속성조회
const landCharacteristicsService = (authkey, pnu, stdrYear, format, numOfRows, pageNo) => {
    return new Promise((resolve, reject)=> {
        let xhr = new XMLHttpRequest();     
        let HttpUrl = "http://openapi.nsdi.go.kr/nsdi/LandCharacteristicsService/attr/getLandCharacteristics"; /*URL*/     
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

        return
    });
}
// 국가공간 - 토지이동이력속성조회
const landMoveService = (authkey, pnu, startDt, endDt, format, numOfRows, pageNo) => {
    return new Promise((resolve, reject)=> {
        let xhr = new XMLHttpRequest();     
        let HttpUrl = "http://openapi.nsdi.go.kr/nsdi/LandMoveService/attr/getLandMoveAttr"; /*URL*/     
        let parameter = '?' + encodeURIComponent("authkey") +"="+encodeURIComponent(authkey); /*authkey Key*/     
        parameter += "&" + encodeURIComponent("pnu") + "=" + encodeURIComponent(pnu); /* 고유번호(8자리 이상) */  
        parameter += "&" + encodeURIComponent("startDt") + "=" + encodeURIComponent(startDt); /* 기준연도(YYYY: 4자리) */  
        parameter += "&" + encodeURIComponent("endDt") + "=" + encodeURIComponent(endDt); /* 기준연도(YYYY: 4자리) */  
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
        return
    });
}


// 토지특성속성조회,토지이동이력속성 조회하기
// API 신청한거 승인나면 구현하기
router.get('/landTypeSearch', async (req, res) => {
    console.log("토지유형 조ㅚ");
    try {
        let pnu = req.session.pnu;
        let stdrYear = "2023";
        let format = "json";
        let numOfRows = "10";
        let pageNo = "1";

        // 국가공간 - 토지특성속성조회
        let landCharacteristicsKey = properties.landCharacteristicsKey;
        let rs1 = await landCharacteristicsService(landCharacteristicsKey, pnu, stdrYear, format, numOfRows, pageNo);
        // 국가공간 - 토지이동이력속성조회
        let landMoveAttrKey = properties.landMoveAttrKey;
        let rs2 = await landMoveService(landMoveAttrKey, pnu, "", "", format, numOfRows, pageNo);

        // 필요한 속성
        let rstDataKeys = [
            'lndcgrCodeNm',
            'lndpclAr',
            'tpgrphHgCodeNm',
            'tpgrphFrmCodeNm',
            'roadSideCodeNm',
            'ladMvmnPrvonshCodeNm'
        ];
        let rs1_d = rs1.field[0];
        let rs2_d = rs2.field[0];
        let rstData = {};
        for (let i = 0; i < rstDataKeys.length; i++) {
            if(i == rstDataKeys.length -1) {
                rstData[rstDataKeys[i]] = rs2_d[rstDataKeys[i]];
                break;
            }
            rstData[rstDataKeys[i]] = rs1_d[rstDataKeys[i]];
        }
        return res.status(200).json(rstData);
        
    } catch (error) {
        console.log("landTypeSearch ERROR : ");
        console.log(error);
        return res.status(600).send({ errorMsg: error.message });
    }
});










module.exports = router;