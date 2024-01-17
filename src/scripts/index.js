import "../styles/main.scss"
import $ from "jquery";

import { BoxBackroundHandler } from "./services/boxBackroundHadler"
import { DateHandler } from "./services/dateHandler";
import { RenderData } from "./services/renderData";
let backroundBoxHandler = new BoxBackroundHandler();
let dateHandler = new DateHandler();
let renderData = new RenderData()

let tasksField = $(".tasks")
let weekDateField = $('.week-card__header')

$(document).ready(function () {
    let datesSpecs = dateHandler.initWeekDates()
    renderData.renderDateIn(weekDateField, datesSpecs)

    dateHandler.initDatesOfDays()

    tasksField.on("click", function(event){
        let target = event.target
        backroundBoxHandler.addBackround(target)
    })
});