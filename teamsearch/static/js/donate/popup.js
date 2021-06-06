$(document).ready(function(){
    //Скрыть PopUp при загрузке страницы    
    $("#confpopup").hide();
});
//Функция отображения PopUp
let PopUpShow = (time = 100) => {
    $("#confpopup").fadeIn(time);
    return $("#confpopup");
}
//Функция скрытия PopUp
let PopUpHide = (time = 100) => {
    $("#confpopup").fadeOut(time);
    return $("#confpopup");
}