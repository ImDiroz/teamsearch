$(document).ready(function(){
    //Скрыть PopUp при загрузке страницы    
    $("#report-popup").hide();
});
//Функция отображения PopUp
let ReportPopUpShow = (time = 100) => {
    $("#report-popup").fadeIn(time);
    return $("#report-popup");
}
//Функция скрытия PopUp
let ReportPopUpHide = (time = 100) => {
    $("#report-popup").fadeOut(time);
    return $("#report-popup");
}