

const rest_api_collection = async () => {
    $('.loading').css('display', 'flex');
    await landTypeSearch();
    await rest_api_service();
    await lawData_0();
    // await getEum();

    
    setTimeout(() => {
        $('.loading').css('display', 'none');
    }, 2000);
    return;
}

(function(){

    rest_api_collection();

})();