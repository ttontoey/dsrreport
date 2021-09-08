console.log("yee")
document.addEventListener('DOMContentLoaded', function() {
    var pvu = document.getElementById('pvu');
    var pcs = document.getElementById('pcs');
    var report = document.getElementById('report');
    var history = document.getElementById('history');

    pvu.addEventListener('click', function() {
        window.open('https://marketplace.plantvsundead.com/farm#/farm','_blank');
    }, false);

    pcs.addEventListener('click', function() {
        window.open('https://pancakeswap.finance/swap','_blank');
    }, false);

    history.addEventListener('click', function() {
        window.open('???','_blank');
    }, false);

    report.addEventListener('click', function() {

        chrome.runtime.sendMessage({message: 'get_access_token'});

        report.disabled = true
        $("#report").removeClass("btn-outline-dark")
        $("#report").addClass("btn-success")
        setTimeout(function(){
            report.disabled = false
            $("#report").addClass("btn-outline-dark")
            $("#report").removeClass("btn-success")
        },30000);
    }, false);


   
  }, false);