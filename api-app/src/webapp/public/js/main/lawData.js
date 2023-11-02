
/** 결과물 뿌리기 함수 */

/**
 * 국가법령정보(조례정보 목록-법규ID)
 * @param {Object} lawData_0 
 */
const lawData_00 = (lawData_0) => {

    let jsonData1 = lawData_0.jsonData1; // 광역시/도/특별시 조례검색
    let jsonData2 = lawData_0.jsonData2; // 구/군/시 조례검색
    let str = "";

    jsonData1.forEach(el => {
        str += `
        <tr>
            <td><label class="label">${el['자치법규종류']['_text']}</label></td>
            <td><a href="https://www.law.go.kr/${el['자치법규상세링크']['_text']}"
                    class="title" target="_blank"><u>${el['자치법규명']['_cdata']}</u></a></td>
            <td>2022-12-29</td>
        </tr>
    `
    });
    jsonData2.forEach(el => {
        str += `
        <tr>
            <td><label class="label">${el['자치법규종류']['_text']}</label></td>
            <td><a href="https://www.law.go.kr/${el['자치법규상세링크']['_text']}"
                    class="title" target="_blank"><u>${el['자치법규명']['_cdata']}</u></a></td>
            <td>2022-12-29</td>
        </tr>
    `
    });

    $('.ordinanceData').html(str);

    return;

}
// 본문
const lawData_11 = (lawData_1) => {
    let jsonData = lawData_1;
    if(jsonData == "0") {
        return
    }
    let str = "";
    let jsonData1 = (jsonData['조내용']['_cdata']).split("\n");
    for (let i = 0; i < jsonData1.length; i++) {
        if(i == 0) {
            str += `<b>${jsonData1[i]}</b>`
        }else {
            str += `<br><br>${jsonData1[i]}`
        }
    }
    $('.text-list').html(str);
}


/** ajax 통신요청 */
// 국가법령정보(조례정보 목록-법규ID)
function lawData_0() {
    $.ajax(`/lawAPI/lawData_0`,
        {
            method: 'get',
            // data: { name: "chan" },
            // dataType: 'json'
        }
    )
    .done(function (lawData_0) { // 서버요청이 성공시의 콜백함수
        // console.log(lawData_0);
        lawData_00(lawData_0);
        return;
    })
    .fail(function (error) { // 서버요청이 에러시의 콜백함수
        console.log('lawData_0 에러발생');
        console.log(error.status);
        console.log(error.responseJSON.errorMsg);
        if(error.responseJSON.errorMsg == "NO Search Data") {
            alert("잘못 된 지역값");
        }
    })
    // .always(function () { // 항상 실행 (finally 같은느낌)
    //     alert("complete");
    // });
}

// XML -> JSON 국가법령정보(자치법규 본문 조회) - 개발행위허가 기준
function lawData_1() {
    $.ajax(`/lawAPI/lawData_1`,
        {
            method: 'get',
            // data: { name: "chan" },
            // dataType: 'json'
        }
    )
    .done(function (lawData_1) { // 서버요청이 성공시의 콜백함수
        lawData_11(lawData_1);
    })
    .fail(function (error) { // 서버요청이 에러시의 콜백함수
        console.log('lawData_1 에러발생');
        console.log(error.status);
        console.log(error.responseJSON.errorMsg);
    }); 
}

/**
 * 지역지구/가능여부/조건·제한·예외사항 조회하기
 */
function getEum() {
	$.ajax({
		url: `/lawAPI/getEum`
		, type: "get"
		, success: function (jsonStr) {
            // console.log(jsonStr);
            var parser = new DOMParser();
            var doc = parser.parseFromString(jsonStr, 'text/html');
            let table = doc.getElementsByTagName('table')[0];
            console.log(table);

            let thTitle = table.getElementsByTagName('th');
            let tbody = table.getElementsByTagName('tbody')[0];
            let tr = tbody.getElementsByTagName('tr');
            console.log(tr);

            let thTitle0 = thTitle[0].innerText;
            let thTitle1 = thTitle[1].innerText;
            let thTitle2 = thTitle[2].innerText;
            console.log(thTitle0, thTitle1, thTitle2);


            // console.log(thTitle0, thTitle1, thTitle2);
            // console.log(bb);

            // let cc = $(bb)[0];
            // console.log($(cc).eq(0));

            // console.log($(doc).attr('table'));
            // console.log($(jsonStr)[0].children());
            // let aa = $.parseHTML(jsonStr)[1];
            // console.log(aa.children());
			$('.eumBox').html(jsonStr);

            //tooltip
            $(".ico_i").hover(function () { }, function () {
                $(".poptip", $(this).parent()).show();
            });
            $(".ico_i").hover(
                function () {
                    $(".poptip", $(this).parent()).show();
                },
                function () {
                    $(".poptip", $(this).parent()).hide();
                }
            );
            $(".ico_i").focus(
                function () {
                    $(".poptip", $(this).parent()).show();
                }
            );
            $(".ico_i").blur(
                function () {
                    $(".poptip", $(this).parent()).hide();
                }
            );
            return;
		}
		, error: function (xhr, status, error) {
			console.log(error);
			alert("에러발생");
		}
	});
}



/* 사용 X */
// HTML -> JSON 국가법령정보(자치법규 본문 조회) - 개발행위허가 기준
function lawData_2() {
	$.ajax({
		url : `/lawAPI/lawData_2`
		,type:"get"
		,success:function(lawData_2){
            console.log(lawData_2);;
		}
	    ,error: function(xhr,status, error){
            console.log(error);
	    	alert("lawData_2 에러발생");
	    }
	});
}
function xlsxFile() {
	$.ajax({
		url : `/lawAPI/xlsxFile`
		,type:"get"
		,success:function(xlsxFile){
            console.log(xlsxFile);
		}
	    ,error: function(xhr,status, error){
            console.log(error);
	    	alert("xlsxFile 에러발생");
	    }
	});
}
// xlsxFile();

/** 버튼 클릭시 이벤트 */
// $('.lawSearch').on('click', function() {
//     lawData_0();
// });
$('.lawService').on('click', function() {
    lawData_1();
});
// $('.lawService2').on('click', function() {
//     lawData_2();
// });


