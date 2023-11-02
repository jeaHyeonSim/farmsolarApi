function getAddr(){
	$.ajax({
		//  url :"https://business.juso.go.kr/addrlink/addrCoordUrl.do"  //인터넷망
        //  url : "https://business.juso.go.kr/addrlink/addrLinkUrl.do"
        //  url :"https://business.juso.go.kr/addrlink/addrCoordApiJsonp.do" 
        url :"https://business.juso.go.kr/addrlink/addrCoordApi.do" 
		,type:"post"
		,data:$("#form").serialize()
		// ,dataType:"jsonp"
		,crossDomain:true
		,success:function(jsonStr){
			$("#list").html("");
            console.log(jsonStr);
            console.log(jsonStr[0]);
			var errCode = jsonStr.results.common.errorCode;
			var errDesc = jsonStr.results.common.errorMessage;
			if(errCode != "0"){
				alert(errCode+"="+errDesc);
			}else{
				if(jsonStr != null){
					makeListJson(jsonStr);
					jusoCallBack(jsonStr);
					jusoCallBack_3();
				}
			}
		}
	    ,error: function(xhr,status, error){
            console.log(error);
	    	alert("에러발생");
	    }
	});
}

function makeListJson(jsonStr){
	var htmlStr = "";
	htmlStr += "<table>";
	$(jsonStr.results.juso).each(function(){
		htmlStr += "<tr>";
		htmlStr += "<td>"+this.admCd+"</td>";
		htmlStr += "<td>"+this.rnMgtSn+"</td>";
		htmlStr += "<td>"+this.bdMgtSn+"</td>";
		htmlStr += "<td>"+this.udrtYn+"</td>";
		htmlStr += "<td>"+this.buldMnnm+"</td>";
		htmlStr += "<td>"+this.buldSlno+"</td>";
		htmlStr += "<td>"+this.entX+"</td>";
		htmlStr += "<td>"+this.entY+"</td>";
		htmlStr += "<td>"+this.bdNm+"</td>";
		htmlStr += "</tr>";
	});
	htmlStr += "</table>";
	$("#list").html(htmlStr);
}

function jusoCallBack(jsonStr) {
	let entX,entY,roadAddrPart;
	let proj4_01 = proj4;
	$(jsonStr.results.juso).each(function(index, el){
		entX = this.entX;
		entY = this.entY;
		roadAddrPart = this.admCd;
	});

    $('#h_addr').val(roadAddrPart);

    //소수점 자르고 시작
    let coord_X = Math.round(entX * 1000000) / 1000000;
    let coord_Y = Math.round(entY * 1000000) / 1000000;
    let point = [coord_X, coord_Y];

    proj4_01.defs["EPSG:5179"] = "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs";//제공되는 좌표
	


    let grs80 = proj4_01.Proj(proj4_01.defs["EPSG:5179"])
    let wgs84 = proj4_01.Proj(proj4_01.defs["EPSG:4326"]); //경위도
	let aaa = `
	'16977914',
	'185584879',
	'16983525',
	'185539379',
	'16987005',
	'185582299',
	'16981393',
	'185627799',
	'16977914',
	'185584879'
	`


    let p = proj4_01.toPoint(point);
    p = proj4_01.transform(grs80, wgs84, p);

    console.log('위도: ' + p.y);
    console.log('경도: ' + p.x);
}
function jusoCallBack2(jsonStr) {
	let proj4_02 = proj4;
	

	// var eps2097p = proj4(eps2097_1, wgs84_1, arrB);
	// console.log(eps2097p);
	// let proj4_01 = proj4;
	// let pp = proj4_01.toPoint(arrA);
	// pp = proj4_01.transform(grs80, pp);
	// console.log(pp);

	
    proj4_02.defs["EPSG:5179"] = "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs";//제공되는 좌표
	


    let grs80 = proj4_02.Proj(proj4_02.defs["EPSG:5179"])
    let wgs84 = proj4_02.Proj(proj4_02.defs["EPSG:4326"]); //경위도
    let p = proj4_02.toPoint(point);
    p = proj4_02.transform(grs80, wgs84, p);

    console.log('위도: ' + p.y);
    console.log('경도: ' + p.x);
}

function jusoCallBack_3() {
	$.ajax({
		url : `/jusoAPI/vworldAPI3`
		,type:"get"
		,success:function(jsonStr){
            console.log(jsonStr);
            console.log(jsonStr[0]);

		}
	    ,error: function(xhr,status, error){
            console.log(error);
	    	alert("에러발생");
	    }
	});
}
  /*
     <form name="form" id="form" method="post">


        <input type="text" name="confmKey" value="U01TX0FVVEgyMDIzMTAxMjE1MzMyMDExNDE2Mjc="/><!-- 요청 변수 설정 (승인키) -->
        <input type="text" name="admCd" value="2920016000"/> <!-- 요청 변수 설정 (행정구역코드) -->
        <input type="text" name="rnMgtSn" value="292003352953"/><!-- 요청 변수 설정 (도로명코드) --> 
        <input type="text" name="udrtYn" value="0"/> <!-- 요청 변수 설정 (지하여부) -->
        <input type="text" name="buldMnnm" value="15"/><!-- 요청 변수 설정 (건물본번) --> 
        <input type="text" name="buldSlno" value=""/><!-- 요청 변수 설정 (건물부번) --> 
        <input type="button" onClick="getAddr();" value="좌표검색하기"/>
        <div id="list" ></div><!-- 검색 결과 리스트 출력 영역 -->

        <table >
			<colgroup>
				<col style="width:20%"><col>
			</colgroup>
			<tbody>
				<tr>
					<th>우편번호</th>
					<td>
					    <input type="hidden" id="confmKey" name="confmKey" value=""  >
						<input type="text" id="zipNo" name="zipNo" readonly style="width:100px">
						<input type="button"  value="주소검색" onclick="goPopup();">
					</td>
				</tr>
				<tr>
					<th><label>도로명주소</label></th>
					<td><input type="text" id="roadAddrPart1" style="width:85%"></td>
				</tr>
				<tr>
					<th>상세주소</th>
					<td>
						<input type="text" id="addrDetail" style="width:40%" value="">
						<input type="text" id="roadAddrPart2"  style="width:40%" value="">
					</td>
				</tr>
				<tr>
					<th>좌표정보</th>
					<td>
						<input type="text" id="entX" style="width:40%" value="">
						<input type="text" id="entY"  style="width:40%" value="">
					</td>
				</tr>
			</tbody>
		</table>
    </form>

    */

/*
// function init(){
//     var url = location.href;
//     var confmKey = "U01TX0FVVEgyMDIzMTAxMjE1MzMyMDExNDE2Mjc=";//승인키
//     var resultType = "4"; // 도로명주소 검색결과 화면 출력유형, 1 : 도로명, 2 : 도로명+지번, 3 : 도로명+상세건물명, 4 : 도로명+지번+상세건물명
//     var inputYn= "<%=inputYn%>";
//     if(inputYn != "Y"){
//         document.form.confmKey.value = confmKey;
//         document.form.returnUrl.value = url;
//         document.form.resultType.value = resultType;
//         document.form.action="https://business.juso.go.kr/addrlink/addrCoordUrl.do"; // 인터넷망
//         document.form.submit();
//     }else{
//         opener.jusoCallBack("<%=roadFullAddr%>","<%=roadAddrPart1%>","<%=addrDetail%>", "<%=roadAddrPart2%>","<%=engAddr%>"
//             , "<%=jibunAddr%>","<%=zipNo%>", "<%=admCd%>", "<%=rnMgtSn%>", "<%=bdMgtSn%>", "<%=detBdNmList%>"
//             , "<%=bdNm%>", "<%=bdKdcd%>", "<%=siNm%>", "<%=sggNm%>", "<%=emdNm%>", "<%=liNm%>", "<%=rn%>", "<%=udrtYn%>"
//             , "<%=buldMnnm%>", "<%=buldSlno%>", "<%=mtYn%>", "<%=lnbrMnnm%>", "<%=lnbrSlno%>", "<%=emdNo%>", "<%=entX%>", "<%=entY%>");
//         window.close();
//     }
// }

<form id="form" name="form" method="post">
<input type="hidden" id="confmKey" name="confmKey" value="U01TX0FVVEgyMDIzMTAxMjE1MzMyMDExNDE2Mjc="/>
<input type="hidden" id="returnUrl" name="returnUrl" value="4"/>
<input type="hidden" id="resultType" name="resultType" value=""/>
<!-- 해당시스템의 인코딩타입이 EUC-KR일경우에만 추가 START--> 
<!-- 
<input type="hidden" id="encodingType" name="encodingType" value="EUC-KR"/>
 -->
<!-- 해당시스템의 인코딩타입이 EUC-KR일경우에만 추가 END-->
</form>


*/

let url2 = `https://api.vworld.kr/req/data?
service=data&version=2.0
&request=GetFeature
&key=045D5FE7-1CC7-3CE8-B653-793E6F1919FB
&format=xml
&errorformat=xml
&size=10
&page=1
&data=LT_C_ADSIDO_INFO

&attrfilter=ctprvn_cd:like:2920016000
&columns=GetFeature
&geometry=true
&attribute=true

&domain=`

"&crs=EPSG:900913"

let url3 = `https://api.vworld.kr/req/data?service=data&version=2.0
&request=GetFeature
&key=
&format=xml
&errorformat=xml
&size=10
&page=1
&data=LT_C_ADSIDO_INFO
&attrfilter=ctp_kor_nm:like:광주광역시
&columns=ctprvn_cd,ctp_kor_nm,ctp_eng_nm,ag_geom
&geometry=true
&attribute=true
&crs=EPSG:5179
&domain=`


function getAddr2(){
	$.ajax({
        // url :`https://api.vworld.kr/req/data?ctprvn_cd=2920016000&ctp_kor_nm=광주광역&key=045D5FE7-1CC7-3CE8-B653-793E6F1919FB`
		url : `/jusoAPI/vworldAPI`
		,type:"get"
		,success:function(jsonStr){
            console.log(jsonStr);
            console.log(jsonStr[0]);

		}
	    ,error: function(xhr,status, error){
            console.log(error);
	    	alert("에러발생");
	    }
	});
}
getAddr2();

function getAddr3(){
	$.ajax({
		url : `/jusoAPI/vworldAPI2`
		,type:"get"
		,success:function(jsonStr){
            console.log(jsonStr);
            console.log(jsonStr[0]);

		}
	    ,error: function(xhr,status, error){
            console.log(error);
	    	alert("에러발생");
	    }
	});
}

// getAddr3();
