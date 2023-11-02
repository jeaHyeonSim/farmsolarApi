let isNoticeLayerView = false;
let noticeCnt = 0;

let g_powerPlantInfo;
// 로그인한 유저가 선택한 발전소 보내기.
window.onload = function () {
    function selectSn() {
        // let trackingSn = '2022092622093';
        // let fixedSn = '2022092622025';
        let trackingSn = '220821243';
        let fixedSn = '220821242';
        localStorage.setItem('trackingSn', trackingSn);
        localStorage.setItem('fixedSn', fixedSn);
    }

    // $('.logout').on('click', function(){
    //     console.log("로그아웃");
    //     localStorage.clear();
    //     location.href = '/logout'
    // });

    // 로컬스토리지 sn 값 담기
    // selectSn();

    
};

function abnormalCheck() {
    g_powerPlantInfo = [
        {
            powerplantId:'greenfescoID',
            powerplantName : 'GF-VDBox01'
        }
    ];
    let message = {
        destinationName : '/sspRtuMqttSubscribe',
        payloadString : {        
            powerPlantID : 'greenfescoID',
            noticeMsg : '차단기 트립 과전압 발생 ',
            noticeType : 'I'
        },

    }

    onMessageArrived(message);
}


// called when a message arrives
function onMessageArrived(message) {
    //console.log("onMessageArrived:" + message.payloadString);

    let topicStr = message.destinationName;
    // let jsonMsg = JSON.parse(message.payloadString);
    let jsonMsg = message.payloadString

    //알림 내용 표기 (RTU TCP통신에서 보낸 알림)
    if (topicStr == '/sspRtuMqttSubscribe') {
        for (let idx = 0; idx < g_powerPlantInfo.length; idx++) {
            if (jsonMsg.powerPlantID == g_powerPlantInfo[idx].powerplantId) {
                if (jsonMsg.noticeType == 'D') {
                    $("#noticeAllSection").append("<br/><div class='dangerNotice'>" + "[" + g_powerPlantInfo[idx].powerplantName + "] " + jsonMsg.noticeMsg + "</div>");
                } else if (jsonMsg.noticeType == 'W') {
                    $("#noticeAllSection").append("<br/><div class='warningNotice'>" + "[" + g_powerPlantInfo[idx].powerplantName + "] " + jsonMsg.noticeMsg + "</div>");
                } else if (jsonMsg.noticeType == 'I') {
                    $("#noticeAllSection").append("<br/><div class='infoNotice'>" + "[" + g_powerPlantInfo[idx].powerplantName + "] " + jsonMsg.noticeMsg + "</div>");
                } else {
                    $("#noticeAllSection").append("<br/><div class='nomalNotice'>" + "[" + g_powerPlantInfo[idx].powerplantName + "] " + jsonMsg.noticeMsg + "</div>");
                }
                break;
            }
        }
    }

    //Div 스크롤 위치 하단 설정
    $("#noticeAllSection").scrollTop($("#noticeAllSection").prop("scrollHeight"));

    //알림 화면 출력
    if (!isNoticeLayerView) {
        if ((jsonMsg.noticeType == 'D') || (jsonMsg.noticeType == 'W')) {
            modalChttingShow();
            $("#newNoticeCnt").html("0건");
            //새로운 알림 초기화
            noticeCnt = 0;
        } else {
            noticeCnt++;
            $("#newNoticeCnt").html(noticeCnt + "건");
        }
    }
}

//알림창
function noticeInit() {
    //초기 로딩시 숨기기
    $("#modalNoticeLayer").hide();

    //Make the DIV element draggagle:
    dragElement(document.getElementById(("modalNoticeLayer")));

    //새로운 알림 초기화
    noticeCnt = 0;

    $("#noticeHideDiv").on("click", function () {
        isNoticeLayerView = false;
        //알림 화면 숨기기
        //$("#modalNoticeLayer").fadeOut("slow");
        //$("#modalNoticeLayer").fadeOut("fast");
        $("#modalNoticeLayer").fadeOut();
    });

    $("#newNoteiceItem").on("click", function () {
        if (!isNoticeLayerView) {
            modalChttingShow();
            $("#newNoticeCnt").html("0건");
            //새로운 알림 초기화
            noticeCnt = 0;
        };
    });
}

//알림 화면 출력
function modalChttingShow() {
    // var leftPoint = (screen.width - 600) / 3;

    // 좌표 새로 설정
    $("#modalNoticeLayer").css({
        "top": "520px",
        "left": "635px"
    });

    // 화면 출력
    $("#modalNoticeLayer").fadeIn("slow");

    isNoticeLayerView = true;
}


(function () {
    getDataTime();

    setInterval(() => { getDataTime(); }, 1000);

    
    //알림 창 초기 설정
    noticeInit();
    
    //에러 감지하기
    abnormalCheck();
})()
