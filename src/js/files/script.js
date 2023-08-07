// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";



$(document).ready(function(){
    $(".parallax__list>li").addClass("layer");
    $(".parallax__list").parallax();
    $('.wrapper').addClass('active');
})