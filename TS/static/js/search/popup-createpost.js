$(document).ready(function(){
    //Скрыть PopUp при загрузке страницы    
    $("#createpost-popup").hide();
});
//Функция отображения PopUp
let CreatePostPopupShow = (time = 100) => {
    $("#createpost-popup").fadeIn(time);
    return $("#createpost-popup");
}
//Функция скрытия PopUp
let CreatePostPopupHide = (time = 100) => {
    $("#createpost-popup").fadeOut(time);
    return $("#createpost-popup");
}

document.querySelector(".cancelPost").onclick = CreatePostPopupHide;
document.querySelector(".createPostButton").onclick = CreatePostPopupShow;
