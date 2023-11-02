function getCurrtDay() {
    var today = new Date();

    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);

    var dateStr = year + '-' + month  + '-' + day;

    return dateStr;
}

function getDataTime() {  
    var today = new Date();

    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);

    var dateStr = year + '-' + month  + '-' + day;

    var week = new Array('SUN', 'MON', 'TRU', 'WED', 'THU', 'FRI', 'SAT');
    var weekStr = week[today.getDay()];

    var hours = ('0' + today.getHours()).slice(-2);
    var minutes = ('0' + today.getMinutes()).slice(-2);
    var seconds = ('0' + today.getSeconds()).slice(-2);

    var timeStr = hours + ' : ' + minutes  + ' : ' + seconds;

    $("#currtDate").html(dateStr + ' ' + weekStr);
    $("#currtTime").html(timeStr);
}

function getCurrtDateFormat() {  
    var today = new Date();

    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);

    var hours = ('0' + today.getHours()).slice(-2);
    var minutes = ('0' + today.getMinutes()).slice(-2);
    var seconds = ('0' + today.getSeconds()).slice(-2);

    var currtDateFormat = year + '-' + month  + '-' + day + ' ' + hours + ' : ' + minutes  + ' : ' + seconds;

    return currtDateFormat;
}

function currentTime(){
    // 이번주 구하기
    let currentDay = new Date();  
    let theYear = currentDay.getFullYear();
    let theMonth = currentDay.getMonth();
    let theDate = currentDay.getDate();
    let theDayOfWeek = currentDay.getDay();

    // 이번주
    let thisWeek = [];
    for (let i = 0; i < 8; i++) {
        let resultDay = new Date(theYear, theMonth, theDate + (i - theDayOfWeek));
        let yyyy = resultDay.getFullYear();
        let mm = ('0' + (resultDay.getMonth() +1)).slice(-2);
        let dd = ('0' + resultDay.getDate()).slice(-2);

        mm = String(mm).length === 1 ? '0' + mm : mm;
        dd = String(dd).length === 1 ? '0' + dd : dd;

        thisWeek[i] = yyyy + '-' + mm + '-' + dd;
    }
    //저번주
    let previousWeek = [];
    for (let i = 0; i > -8; i--) {
        let resultDay = new Date(theYear, theMonth, theDate + (i - theDayOfWeek));
        let yyyy = resultDay.getFullYear();
        let mm = ('0' + (resultDay.getMonth() +1)).slice(-2);
        let dd = ('0' + resultDay.getDate()).slice(-2);

        mm = String(mm).length === 1 ? '0' + mm : mm;
        dd = String(dd).length === 1 ? '0' + dd : dd;

        previousWeek[(i*-1)] = yyyy + '-' + mm + '-' + dd;
    }
    let allTime = moment().format('YYYY-MM-DD HH:mm:ss'); // 2022-07-07 13:51:50
    let yesterdayTime = moment().subtract(1, "d").format('YYYY-MM-DD'); // 어제 날짜 2022-07-06
    let todayTwoHoursAgo = moment().subtract(2, "h").format('YYYY-MM-DD HH');  // 오늘 날짜두시간전 2022-07-08 13
    let todayOneHoursAgo = moment().subtract(1, "h").format('YYYY-MM-DD HH'); // 오늘 날짜한시간전 2022-07-08 14
    let todayTime = moment().format('YYYY-MM-DD'); // 오늘 날짜 2022-08-04
    let todayMonth = moment().format('MM');
    let thisMonth =  moment().format('MM'); // 현대 달

    let nowTime = moment().format('YYYY-MM-DD HH'); // 현재 시간 2022-07-19 09
    let todayYear = moment().format('YYYY'); // 올해
    let lastYear = moment().subtract(1, "y").format('YYYY'); // 1년 전
    let twoAgoYear = moment().subtract(2, "y").format('YYYY'); // 2년 전
    let thisYearMonth = moment().format('YYYY-MM'); // 2022-07
    let previousYearMonth = moment().subtract(1, "M").format('YYYY-MM'); // 2022-06

    let hours = moment().format('HH');// 현재 시간 16
    let prevMonth01 = moment().subtract(1, "M").format('YYYY-MM');// 지난달 2022-06
    let oneHoursAgo = moment().subtract(1, "h").format('HH');// 한시간 전 12
    let twoHoursAgo = moment().subtract(2, "h").format('HH');// 두시간 전 11
        
    let sixMinutesAgo = moment().subtract(6, "m").format('YYYY-MM-DD HH:mm'); // 20분 전 
    let thisTimeMinutes = moment().format('YYYY-MM-DD HH:mm'); // 현재 년월일 시분

	let timeAll = [allTime, hours, oneHoursAgo, todayTime, twoHoursAgo, //4
        yesterdayTime, todayTwoHoursAgo, todayOneHoursAgo, todayMonth, nowTime, //9
        todayYear, lastYear, thisYearMonth, previousYearMonth, thisMonth, //14
        prevMonth01, thisWeek, previousWeek , twoAgoYear, sixMinutesAgo, // 19
        thisTimeMinutes] //20


    return timeAll;
};