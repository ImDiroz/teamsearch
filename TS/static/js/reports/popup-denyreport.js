$(document).ready(function(){
    //Скрыть PopUp при загрузке страницы    
    $("#denyreport-popup").hide();
});
//Функция отображения PopUp
let DenyReportPopupShow = (time = 100) => {
    $("#denyreport-popup").fadeIn(time);
    return $("#denyreport-popup");
}
//Функция скрытия PopUp
let DenyReportPopupHide = (time = 100) => {
    $("#denyreport-popup").fadeOut(time);
    return $("#denyreport-popup");
}