

const landTypeSearch_0 = (data) => {
    let str = "";
    $('.trData').html(`
        <td>${data['lndcgrCodeNm']}</td>
        <td>${data['lndpclAr']} m<sup>2</sup></td>
        <td>${data['tpgrphHgCodeNm']}</td>
        <td>${data['tpgrphFrmCodeNm']}</td>
        <td>-</td>
        <td>${data['roadSideCodeNm']}</td>
        <td>${data['ladMvmnPrvonshCodeNm']}</td>
    
    `);

}



/** 비동기 통신 */
// 토지이동이력속성 조회하기
function landTypeSearch() {
    $.ajax(`/landType/landTypeSearch`,
        {
            method: 'get',
            // data: { name: "chan" },
            // dataType: 'json'
        }
    )
    .done(function (landTypeSearch) { // 서버요청이 성공시의 콜백함수
        // console.log(typeof landTypeSearch);
        landTypeSearch_0(landTypeSearch)
    })
    .fail(function (error) { // 서버요청이 에러시의 콜백함수
        console.log('landTypeSearch 에러발생');
        console.log(error.status);
        console.log(error.responseJSON.errorMsg);
        // if(error.responseJSON.errorMsg == "NO Search Data") {
        //     alert("잘못 된 지역값");
        // }
    })
    // .always(function () { // 항상 실행 (finally 같은느낌)
    //     alert("complete");
    // });
}


/** 버튼 클릭시 이벤트 */
$('.landTypeSearchBtn').on('click', function() {
    landTypeSearch();
});