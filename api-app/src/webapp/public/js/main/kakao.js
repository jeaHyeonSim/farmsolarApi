
// 카카오에서 입력한 주소 좌표 얻기
function kakaoAddress(addr) {
    $.ajax({
        url :`https://dapi.kakao.com/v2/local/search/address.json?query=광주광역시 광산구 삼거동 930` 
		,type:"get"
		// ,dataType:"jsonp"
        ,headers : {'Authorization': `KakaoAK 5396bdb11af5af0741cf1ce924f30d27`}
		,crossDomain:true
        ,dataType : 'json'
		,success:function(jsonStr){
            console.log(jsonStr);
            console.log(jsonStr.documents[0].address); // 지번주소
            console.log(jsonStr.documents[0].road_address); // 도로명 주소
            console.log(jsonStr.documents[0].x); 
            console.log(jsonStr.documents[0].y);
		}
	    ,error: function(xhr,status, error){
            console.log(error);
	    	alert("에러발생");
	    }
	});
}

kakaoAddress();


// daum.maps.event.addListener(polygon, 'click', function () {
//     editpolygon = null;
//     var check = confirm('구역을 수정하시겠습니까?');
//     if (check) {
//         var path = polygon.getPath();
//         manager.put(daum.maps.drawing.OverlayType.POLYGON, path);
//         editpolygon = polygon;
//         console.log('editpolygon : ', editpolygon);
//         for (var i = 0, len = areas.length; i < len; i++) {
//             if (areas[i].polygon == editpolygon) {
//                 selectKey = areas[i].key;
//                 break;
//             }
//         }
//         editFlag = true;
//         newFlag = false;
//     }
// });


