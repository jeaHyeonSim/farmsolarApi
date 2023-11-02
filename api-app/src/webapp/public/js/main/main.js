

// fetch 참고 폼
const fetchForm = () => {
    fetch('URL', {
        method: 'post',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            a:1
        }),
    })
    .then((res) => res.json())
    .then((data) => {
        // 결과 리턴
        return;
    })
    .catch((err) => {
        // 에러 리턴
        return;
    })
}
// ajax 참고 폼
const GetAddr = () => {
    if(checkSearchedWord(document.fsearch.keyword) == false)
    {
        $("#fsearch_addr").val("");
        return false;
    }
    
    var txt = $("#fsearch_addr").val();
    if(txt.length >= 2){
        $.ajax({
            url: `https://business.juso.go.kr/addrlink/addrLinkApi.do?currentPage=1&countPerPage=10&keyword=${txt}&resultType=json
            &confmKey=devU01TX0FVVEgyMDIzMDkyNTE0MDk1MDExNDEyODQ=`,
            // dataType: 'json',
            type: 'GET',
            // data : {
                
            // },
            success: function (data) {
                // 결과 리턴
                if(data && data.results.juso){
                    console.log(data.results.juso);
                    // for (let i = 0; i < data.results.juso.length; i++) {
                    //     console.log(data.results.juso[i].roadAddr);
                        
                    // }
                }
                // 결과 값 초기화
                $('.search_result_title').remove();
                $('.search_result_ul').remove();

                // 에러코드
                var errCode = data.results.common.errorCode;
                var errDesc = data.results.common.errorMessage;
                console.log(errCode);
                // errorCode가 0인 경우 정상
                if (errCode == '0') {
                    // 받아온 결과가 1개 이상인 경우
                    if (data.results.common.totalCount > 0) {
                        $('.addr_list_inbox').append(
                            '<ul class="search_result_ul"></ul>'
                        );
                        //roadAddr
                        $.each(data.results.juso, function (i, v) {
                            $('.search_result_ul').append(
                                "<li class='search_result_li' data->" +
                                "<span class='search_result_jibunAddr' >" +
                                v['jibunAddr'] +
                                "<br></span>" +
                                "<span class='search_result_roadAddr'>" +
                                v['roadAddr'] +
                                "</span>" +
                                "</li>"
                            );
                            // $('.search_result_addr').highlight(addr);
                        });
                    }
                    else {
                        $('.addr_list_inbox').append(
                            '<p class="search_result_title">검색 결과가 존재하지 않습니다.</p>'
                        );
                    }
                }
                else {
                    alert(errCode + '=' + errDesc);
                }
            },
            error: function (data, status, err) {
                // 에러 리턴
                console.log(err);
            }
        });
    }else {
        console.log("뭐든 에러");
    }
    
}


/**
*  
    ladSn: "3532"
    ladUseSittn: "240"
    ladUseSittnNm: "상업기타"
    lastUpdtDt: "2023-07-12"
    ldCode: "4681025022" // 행정구역 코드
    ldCodeNm: "전라남도 강진군 강진읍 남성리"
    lndcgrCode: "08"
    lndcgrCodeNm: "대"
    lndpclAr: "1668"
    mnnmSlno: "170-1"

    lnbrMnnm: "170" // 번
    lnbrSlno: "1"   // 지

    pblntfPclnd: "436800"
    pnu: "4681025022101700001"
    prposArea1: "22"
    prposArea1Nm: "일반상업지역"
    prposArea2: "00"
    prposArea2Nm: "지정되지않음"
    regstrSeCode: "1"
    regstrSeCodeNm: "일반"
    roadSideCode: "04"
    roadSideCodeNm: "중로한면"
    stdrMt: "01"
    stdrYear: "2023"
    tpgrphFrmCode: "04"
    tpgrphFrmCodeNm: "사다리형"
    tpgrphHgCode: "02"
    tpgrphHgCodeNm: "평지"

 *  [126.66907912, 35.16897513, 126.66969669, 35.16856671, 126.6700771, 35.16895461, 126.66907912, 35.16897513]
    admCd         행정구역코드 : "2920016000"
    bdKdcd        공동주택여부 (1:공동주택, 0: 비공동주택) : "0"
    bdMgtSn       건물관리번호 : "2920016000109300000000001"
    bdNm          건물명 : ""
    buldMnnm      건물본번 : "15"
    buldSlno      건물부번 (부번이 없는 경우 0) : "0"
    detBdNmList   상세건물명 : ""
    emdNm         읍면동명 : "삼거동"
    emdNo         읍면동일련번호 : "01"
    engAddr       도로명주소(영문) : "15 Bitgeurin 18-ro, Gwangsan-gu, Gwangju"
    jibunAddr     지번 정보 : "광주광역시 광산구 삼거동 930"
    liNm          법정리명 : ""
    lnbrMnnm      지번본번(번지) : "930"
    lnbrSlno      지번부번(호) (부번이 없는 경우 0) : "0"
    mtYn          산여부 (0:대지, 1:산) : "0"
    rn            도로명 : "빛그린18로"
    rnMgtSn       도로명코드 : "292003352953"
    roadAddr      전체 도로명주소 : "광주광역시 광산구 빛그린18로 15 (삼거동)"
    roadAddrPart1 도로명주소(참고항목 제외): "광주광역시 광산구 빛그린18로 15"
    roadAddrPart2 도로명주소(참고항목): " (삼거동)"
    sggNm         시군구명 : "광산구"
    siNm          시도명 : "광주광역시"
    udrtYn        지하여부 (0:지상, 1:지하) : "0"
    zipNo         우편번호 : "62405"
    

    pnu 코드 규칙
    행정구역코드 (
        광역시도코드(2자리) 
        + 시/군/구 코드(3자리) 
        + 읍/면/동 코드(3자리) 
        + 리 코드(2자리) 
    )
    + 토지/임야 코드(1자리)
    + 본번 코드(4자리) 
    + 부번 코드(4자리)

    // pnu 코드 예시
    행정구역코드(2920016000) +
    1(필지구분, 일반은 1 산은 2) +
    0150(본번을 0000으로 패딩) + 
    0006(부번을 0000으로 패딩)


    pnu = admCd 행정구역코드 +
    mtYn 1(필지구분, 일반은 1 산은 2) +
    lnbrMnnm (본번을 0000으로 패딩) +
    lnbrSlno (부번을 0000으로 패딩) 

    pnu = '2920016000' + '1' + ('0'+'930') + ('000' + '0')
    pnu =>   2920016000109300000

    // 참고 사이트 리턴값
    bldnm : ""
    jibun : "광주광역시 광산구 삼거동 930"
    lat : "35.169122855"
    lng : "126.669652217"
    pnu : "2920016000109300000"
    roadAddress : "광주광역시 광산구 빛그린18로 15 (삼거동)"
    zipCode : "62405"


    lastUpdtDt: "2023-07-11"
    ldCode: "2917014100"
    ldCodeNm: "광주광역시 북구 오룡동"
    mnnmSlno: "1110-10"
    pblntfDe: "2023-04-28"
    pblntfPclnd: "348800"
    pnu: "2917014100111100010"
    regstrSeCode: "1"
    regstrSeCodeNm: "일반"
    stdLandAt: "N"
    stdrMt: "01"
    stdrYear: "2023"

    
    archArea: 81.12
    atchBldArea: 0
    atchBldCnt: 0
    bcRat: 0
    bjdongCd: "16000"
    bldNm: ""
    block: ""
    bun: "0930"
    bylotCnt: 0
    crtnDay: "20220427"
    dongNm: "주2동"
    emgenUseElvtCnt: 0
    engrEpi: 0
    engrGrade: ""
    engrRat: 0
    etcPurps: "공장"
    etcRoof: "판넬"
    etcStrct: "일반철골구조"
    fmlyCnt: 0
    gnBldCert: 0
    gnBldGrade: ""
    grndFlrCnt: 1
    heit: 5.16
    hhldCnt: 0
    hoCnt: 0
    indrAutoArea: 0
    indrAutoUtcnt: 0
    indrMechArea: 0
    indrMechUtcnt: 0
    itgBldCert: 0
    itgBldGrade: ""
    ji: "0000"
    lot: ""
    mainAtchGbCd: "0"
    mainAtchGbCdNm: "주건축물"
    mainPurpsCd: "17000"
    mainPurpsCdNm: "공장"
    mgmBldrgstPk: "29200-100356868"
    naBjdongCd: "16001"
    naMainBun: 15
    naRoadCd: "292003352953"
    naSubBun: 0
    naUgrndCd: "0"
    newPlatPlc: "광주광역시 광산구 빛그린18로 15"
    oudrAutoArea: 38.25
    oudrAutoUtcnt: 3
    oudrMechArea: 0
    oudrMechUtcnt: 0
    platArea: 0
    platGbCd: "0"
    platPlc: "광주광역시 광산구 삼거동 930번지"
    pmsDay: "20210930"
    pmsnoGbCd: "1101"
    pmsnoGbCdNm: "신축허가"
    pmsnoKikCd: "3630262"
    pmsnoKikCdNm: "건축과"
    pmsnoYear: "2021"
    regstrGbCd: "1"
    regstrGbCdNm: "일반"
    regstrKindCd: "2"
    regstrKindCdNm: "일반건축물"
    rideUseElvtCnt: 0
    rnum: 1
    roofCd: "90"
    roofCdNm: "기타지붕"
    rserthqkAblty: ""
    rserthqkDsgnApplyYn: "0"
    sigunguCd: "29200"
    splotNm: ""
    stcnsDay: "20211020"
    strctCd: "31"
    strctCdNm: "일반철골구조"
    totArea: 81.12
    totDongTotArea: 81.12
    ugrndFlrCnt: 0
    useAprDay: "20220421"
    vlRat: 0
    vlRatEstmTotArea: 81.12

 */
