let table = document.getElementsByTagName('table')[0];
let thTitle = table.getElementsByTagName('th');
let tbody = table.getElementsByTagName('tbody')[0];
let tr = tbody.getElementsByTagName('tr');

// 타이틀 텍스트 [ 지역·지구, 가능여부, 조건·제한·예외사항 ]
let thTitle0 = thTitle[0].innerText;
let thTitle1 = thTitle[1].innerText;
let thTitle2 = thTitle[2].innerText;

// 가져온 데이터 분리하기
let trArr = new Array();  // 타이틀 데이터 담기용
let popArr = new Array(); // 팝업 데이터 담기용
for (let i = 0; i < tr.length; i++) {
    trArr[i] = {};
    popArr[i] = {};
    for (let j = 0; j < 3; j++) {
        let td = tr[i].getElementsByTagName('td');
        // 타이틀 데이터 어레이
        if(td[j].innerText != "") {
            // 조건/제한/예외사항 td는 있고 데이터만 없는 경우도 있기때문데 조건문 사용
             // tip 을 찾아서 담기
            let tdTip = td[j].getElementsByClassName('tip')[0];
            if(j == 2) {
                // tr > td 중 3번째 td에 리스트가 여러개일 경우 <br> 추가용
                let tdLi = td[j].getElementsByTagName('li');
                if(tdLi.length > 0) { // li태그가 있을경우
                    for (let k = 0; k < tdLi.length; k++) {
                        if(tdLi.length == 1) { // li태그가 1개일 경우
                            trArr[i][`${j}`] = tdLi[k].innerText;
                        }else {
                            // li태그가 2개이상일 경우
                            if(tdLi.length -1 == k) { 
                                trArr[i][`${j}`] += tdLi[k].innerText;
                            }else {
                                trArr[i][`${j}`] = tdLi[k].innerText + "<br>";
                            }
                        }
                    }
                }else { // li태그가 없을경우 (데이터가 없음)
                    trArr[i][`${j}`] = "";
                }
            }else {
                 // tr > td 중 1,2번째 타이틀 데이터 담기용
                trArr[i][`${j}`] = tdTip.innerText;
            }
        }

        // 팝업 데이터 어레이
        if(j != 2) { // 각 tr의 3번째 td에는 팝업 데이터가 없음
            if(td[j].querySelector('.ttl')) {  
                popArr[i][`${j}`] =  td[j].querySelector('.ttl').innerText + " - " + td[j].querySelector('.con').innerText
            }else {
                popArr[i][`${j}`] =  td[j].querySelector('.con').innerText
            }
        }else {
            popArr[i][`${j}`] =  "";
        }
    }
}

console.log(trArr);
console.log(popArr);

// 분리한 데이터 HTML 태그로 다시 만들기
let strHtml = "";
for (let i = 0; i < trArr.length; i++) {
    strHtml += "<tr>";
    for (let j = 0; j < Object.keys(trArr[i]).length; j++) {
        if(trArr[i][[j]].indexOf("검색결과") >= 0 ){
            // 검색결과가 없기때문에 팝업 필요 없음
            strHtml += `
                <td style="background-color:#FFFFFF;">
                    <span class="gf_tip tipText">
                        ${trArr[i][j]}
                    </span>
                </td>
            `
        }else {
            if(i == 0 && j == 1) {
                strHtml += `
                <td style="background-color:#FFFFFF;">
                    <span class="gf_tip ico_i tipText">
                        ${trArr[i][j]}
                    </span>
                    <div class="gf_poptip" style="display:none;">
                        <div class="gf_con">
                            ${popArr[i][j]}
                        </div>
                        <div class="popper_arrow" style="display:block;"></div>
                    </div>
                </td>
            `
            // <a href="javascript:;"><img src="/web/images/ar/ico_i.png" alt="info" class="ico_i">
            //     <div class="gf_poptip" style="display:block;">
            //         <div class="gf_con">
            //             ${popArr[i][j]}
            //         </div>
            //         <div class="popper_arrow" style="display:none;"></div>
            //     </div>
            // </a>
            }else {
                if(j == Object.keys(trArr[i]).length -1) {
                    strHtml += `
                        <td style="background-color:#ffffff;">
                            <li class="tipText">${trArr[i][j]}</li>
                        </td>
                    
                    `
                }else {
                    strHtml += `
                        <td style="background-color:#FFFFFF;">
                            <span class="gf_tip ico_i tipText">
                                ${trArr[i][j]}
                            </span>
                            <div class="gf_poptip" style="display:none;">
                                <div class="gf_con">
                                    ${popArr[i][j]}
                                </div>
                                <div class="popper_arrow" style="display:block;"></div>
                            </div>
                        </td>
                    `
                    // <a href="javascript:;"><img src="/web/images/ar/ico_i.png" alt="info" class="ico_i">
                    //     <div class="gf_poptip" style="display:none;">
                    //         <div class="gf_con">
                    //             ${popArr[i][j]}
                    //         </div>
                    //         <div class="popper_arrow" style="display:none;"></div>
                    //     </div>
                    // </a>
                }
            }


        }
    }
    strHtml += "</tr>";
}
$('.htmlText').html(strHtml);


$(".ico_i").hover(function () { }, function () {
    $(".gf_poptip", $(this).parent()).show();
});

$(".ico_i").hover(
    function () {
        // this => gf_tip 클래스
        let prevTr = $(this).parents('tr'); // (this) => tbody > tr
        let prevTd = $(this).parents('td'); // (this) => tbody > tr > td

        // prev.offset(); //  HTML 문서를 기준
        let prevTrPo = prevTr.position();  // tr 태그 포지션
        let prevTdPo = prevTd.position();  // td 태그 포지션
        // console.log(prevTdPo);
        // console.log(prevPL);
        let tipH = $(this).height(); // (this) => gf_tip 태그 높이
        let tipW = $(this).width(); // (this) => gf_tip 태그 넓이
        let poptipW = $(this).next(".gf_poptip").width(); // 생성된 gf_poptip 총 넓이
        let poptipH = $(this).next(".gf_poptip").height(); // 생성된 gf_poptip 총 높이
        
        // let poptipW = $(".gf_poptip", $(this).parent()).outerWidth(); // a태그 총 넓이
        let prevTdW = (prevTd.outerWidth()/2); // td태그 총 넓이

        /*  
            gf_poptip 의 위치 값 구하는 공식 ( 기준은 tobody )
            ((gf_poptip 의 넓이 - gf_tip 의 넓이) / 2) + td 태그 left  =>  만큼 left 이동시키기
            let leftPo = ((poptipW - tipW) / 2).toFixed(1);

            prevTdPo.left 여기에서 빼야한다 기준이 tobody 이기 때문
         */
        /*
            gf_poptip 의 박스 width 설정( 화면 비율에 맞게? 안넘어가게 만들기 )
         */
        // let leftPo = (prevTdPo.left  +((poptipW - tipW) / 2)).toFixed(1) ;
        let leftPo = ( ((poptipW - tipW) / 2) + (prevTdPo.left - (poptipW - tipW) )).toFixed(1);
        $(".gf_poptip", $(this).parent()).css({
            'top' : (prevTrPo.top +tipH + 25) + "px",
            "width" : (poptipW) + "px",
            'left' : `${leftPo}px`
        });
        $(".gf_poptip", $(this).parent()).show();
    },
    function () {
        $(".gf_poptip", $(this).parent()).hide();
    }
);

$(".ico_i").focus(
    function () {
        $(".gf_poptip", $(this).parent()).show();
    }
);
$(".ico_i").blur(
    function () {
        $(".gf_poptip", $(this).parent()).hide();
    }
);

// $(".ico_i").hover(function () { }, function () {
//     $(".poptip", $(this).parent()).show();
// });
// $(".ico_i").hover(
//     function () {
//         $(".poptip", $(this).parent()).show();
//     },
//     function () {
//         $(".poptip", $(this).parent()).hide();
//     }
// );
// $(".ico_i").focus(
//     function () {
//         $(".poptip", $(this).parent()).show();
//     }
// );
// $(".ico_i").blur(
//     function () {
//         $(".poptip", $(this).parent()).hide();
//     }
// );
