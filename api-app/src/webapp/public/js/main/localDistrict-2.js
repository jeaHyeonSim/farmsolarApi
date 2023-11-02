$("#sub").submit(function(e){
    let m_amount = $(this)[0][0].value;
    let amount = $(this)[0][1].value;
    let mYCnt = $(this)[0][2].value;
    let currentAmount = $(this)[0][3].value;
    let purchasesCnt = $(this)[0][4].value;

    localStorage.setItem("m_amount", m_amount);
    localStorage.setItem("amount", amount);
    localStorage.setItem("mYCnt", mYCnt);
    localStorage.setItem("currentAmount", currentAmount);
    localStorage.setItem("purchasesCnt", purchasesCnt);

    let rs = ((Number(m_amount) + Number(amount)) + (Number(currentAmount) * Number(purchasesCnt))) / (Number(mYCnt) + Number(purchasesCnt));

    e.preventDefault();
    $('.rsData > b').text(rs.toLocaleString('ko-KR', { maximumFractionDigits: 2 }))

});

$('.del').on('click', function(){
    console.log("삭제하기");
    localStorage.clear();
    location.reload(true);
});

function aa() {
    let m_amount = localStorage.getItem('m_amount');
    let amount = localStorage.getItem('amount');
    let mYCnt = localStorage.getItem('mYCnt');
    let currentAmount = localStorage.getItem('currentAmount');
    let purchasesCnt = localStorage.getItem('purchasesCnt');
    $('input.m_amount').val(m_amount);
    $('input.amount').val(amount);
    $('input.mYCnt').val(mYCnt);
    $('input.currentAmount').val(currentAmount);
    $('input.purchasesCnt').val(purchasesCnt);
}



(function(){
    aa()
    // rest_api_service();
})();