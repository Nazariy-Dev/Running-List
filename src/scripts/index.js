import "../styles/main.scss"
import $ from "jquery";

import { BoxBackroundHandler } from "./services/boxBackroundHadler"
import { DateHandler } from "./services/dateHandler";
let backroundBoxHandler = new BoxBackroundHandler();
let dateHandler = new DateHandler();

let tasksField = $(".tasks")
let weekDateField = $('.week-card__header')

$(document).ready(function () {
    dateHandler.initWeekDates()
    dateHandler.renderDateIn(weekDateField)

    tasksField.on("click", function(event){
        let target = event.target
        backroundBoxHandler.addBackround(target)
    })
});