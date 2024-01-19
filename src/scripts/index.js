import "../styles/main.scss"
import $ from "jquery";

import { BoxBackroundHandler } from "./services/boxBackroundHadler"
import { DateHandler } from "./services/dateHandler";
import { RenderData } from "./services/renderData";
let backroundBoxHandler = new BoxBackroundHandler();
let dateHandler = new DateHandler(new Date);
let renderData = new RenderData()

let tasksField = $(".tasks")
let weekDateField = $('.week-card__header')
let days = $('[data-day]')


$(document).ready(function () {
    let datesOfDays = dateHandler.initWeekDates()
    let datesSpecs = dateHandler.getDatesSpecs()

    renderData.renderDateIn(weekDateField, datesSpecs)
    renderData.addDatesToDays(datesOfDays, days)

    tasksField.on("click", function(event){
        let target = event.target
        backroundBoxHandler.addBackround(target)
    })
});