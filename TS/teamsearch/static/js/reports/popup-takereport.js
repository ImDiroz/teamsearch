$(document).ready(function(){
    //Скрыть PopUp при загрузке страницы    
    $("#takereport-popup").hide();
});
//Функция отображения PopUp
let TakeReportPopupShow = (time = 100) => {
    $("#takereport-popup").fadeIn(time);
    return $("#takereport-popup");
}
//Функция скрытия PopUp
let TakeReportPopupHide = (time = 100) => {
    $("#takereport-popup").fadeOut(time);
    return $("#takereport-popup");
}
