const express = require('express');
const router = express.Router();
const axios = require('axios');


router.get('/vworldAPI', async function (req, res) {
	let url5 = encodeURI(`https://api.vworld.kr/req/data?service=data
	&version=2.0
	&request=GetFeature
	&key=045D5FE7-1CC7-3CE8-B653-793E6F1919FB
	&format=json
	&errorformat=json
	&size=10
	&page=1
	&data=LT_C_ADSIDO_INFO
	&attrfilter=ctp_kor_nm:like:광주광역시
	&columns=ctprvn_cd,ctp_kor_nm,ctp_eng_nm,ag_geom
	&geometry=true
	&attribute=true
	&crs=EPSG:900913
	&domain=localhost:7592`);


	try {
		await axios({
            method:"GET",
            url : url5,
			// Headers: { 'Content-Type': 'application/json'},
            // baseURL: 'https://epsis.kpx.or.kr/',
            // headers: { 'Content-Type': 'text/html;charset=UTF-8'}, // 요청 헤더 설정
            // headers: { 'Content-Type': 'application/json'}, // 요청 헤더 설정
            // headers: form.getHeaders() , // 폼데이터 사용하기 04 (헤더설정)
						// `responseType`은 서버에서 응답할 데이터 타입을 설정합니다.
            // [ 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream' ]
            // responseType : 'json'
			// dataType : "jsonp",
  
        })
        .then((ress=>{
            console.log("데이터 비동기 조회");
            console.log(ress.data); // 리스폰 내용중 data에 결과가 담겨있다.
			// return res.send(ress.data)
        }))
        .catch(err => {
            console.log("폼데이터 전송 에러 : "+err);
        })
	} catch (error) {
		return(error)
	}
});



router.get('/vworldAPI2', async function (req, res) {
	// 	&srsName=EPSG:5179
	// &pnu=2920016000109300000
	// 	&domain=localhost:7592

	let url00 = encodeURI(`
	https://api.vworld.kr/ned/wfs/getGisAggrBuildingWFS?typename=dt_d164
	&maxFeatures=10
	&resultType=results
	&bbox=
	&pnu=1111017400107020000
	&srsName=EPSG:4326
	&key=045D5FE7-1CC7-3CE8-B653-793E6F1919FB

	`);


	try {
		await axios({
            method:"GET",
            url : url00,
			// Headers: { 'Content-Type': 'application/json'},
            // baseURL: 'https://epsis.kpx.or.kr/',
            // headers: { 'Content-Type': 'text/html;charset=UTF-8'}, // 요청 헤더 설정
            // headers: { 'Content-Type': 'application/json'}, // 요청 헤더 설정
            // headers: form.getHeaders() , // 폼데이터 사용하기 04 (헤더설정)
						// `responseType`은 서버에서 응답할 데이터 타입을 설정합니다.
            // [ 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream' ]
            // responseType : 'json'
			// dataType : "jsonp",
  
        })
        .then((ress=>{
            console.log("데이터 비동기 조회2222");
            console.log(ress.data); // 리스폰 내용중 data에 결과가 담겨있다.
			// return res.send(ress.data)
        }))
        .catch(err => {
            console.log("폼데이터 전송 에러2222 : "+err);
        })
	} catch (error) {
		return(error)
	}
});

/**
 * https://api.vworld.kr/ned/wfs/getGisAggrBuildingWFS?
 * typename=dt_d164
 * &bbox=
 * &pnu=1111017400107020000
 * &maxFeatures=10
 * &resultType=results
 * &srsName=EPSG:4326
 * &key=&domain=
 * 
 */





let proj4 = require('proj4');
router.get('/vworldAPI3', async function (req, res) {
	let arr5174 = [
		169779.14,
		185584.879
	];
	let arr5174All = [
		169779.14,
		185584.879,

		169835.25,
		185539.379,

		169870.05,
		185582.299,

		169813.93,
		185627.799,
	];

	let arr900913 = [
		1.4068568559086557E7,
		4424310.719125545,

	];
	let arr900913All = [
		1.4068568559086557E7,
		4424310.719125545,
		1.4231986854239704E7,
		4619376.856818209
	];

	// 국가공간 토지특성WFS조회 정보
	let arr5179All = [
		924332.39663099, 1686283.05165414, 
		924388.25847712, 1686237.28684275, 
		924423.26103982, 1686280.01703969, 
		924367.38920167, 1686325.78190201, 
	];
	let arr5179 = [
		924332.39663099, 
		1686283.05165414
	];
	// EPSG:4019  (Korean 2000)
	let arr4019All_2 = [
		126.67113135, 35.16647099,
		126.67174897, 35.16606252,
		126.67212942, 35.16645046,
		126.67151169, 35.16685894,
	];
	// V-WORD 토지소유정보WFS조회 정보
	let arr5179All_2 = [
		924332.3713692,1686283.05573868,
		924367.36393998,1686325.7859865,
		924423.23577799,1686280.02112397,
		924388.23321517,1686237.29092707,
	];
	let arr5179_2 = [
		924332.3713692,1686283.05573868
	];
	// EPSG:4326  (Korean 1995)
	let arr4326All = [
		126.66907884,35.16897513,
		126.66945915,35.16936303,
		126.67007683,35.16895461,
		126.66969641,35.16856671,
	];
	let arr4326 = [
		126.66907884,35.16897513
	];
	// EPSG:4019  (Korean 2000)
	let arr4019All = [
		126.66907884,35.16897513,
		126.66945915,35.16936304,
		126.67007683,35.16895461,
		126.66969641,35.16856671,
	];
	let arr4019 = [
		126.66907884,35.16897513
	];



	try
	{
		console.log("공간좌표");
		
		// *UTM-K (GRS80 중부원점): 네이버지도에서 사용중인 좌표계
		let eps5179 = "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs";
		// *보정된 중부원점(Bessel): KLIS에서 중부지역에 사용중
		let eps5174 = "+proj=tmerc +lat_0=38 +lon_0=127.0028902777778 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43";
		//wgs84(위경도)좌표계
		var wgs84 = "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees";

		//*Google Mercator: 구글지도/빙지도/야후지도/OSM 등 에서 사용중인 좌표계

		// EPSG:3857(공식), EPSG:900913(통칭)
		let eps900913 =  "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs";

		// let bbb = [];
		// for (let i = 0; i < (arrB.length)/2; i++) {
		// 	var grs80P = proj4(grs80, wgs84, arrB);
		// 	console.log("grs80P :: ", grs80P);
		// 	bbb[i] = [];
			
		// }
		// var grs80P = proj4(eps5179, wgs84, arrA);
		// console.log("grs80P 변환좌표 => ", grs80P);


		// let eps5174P = proj4(eps5174, wgs84, arr5174);
		// console.log("eps5174P 변환좌표 => ", eps5174P);


		let eps900913P = proj4(eps900913, wgs84, arr900913);
		console.log("eps900913P 변환좌표 => ", eps900913P);
	
	} catch (error) {
		return(error)
	}
});


module.exports = router;