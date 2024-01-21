import "../styles/main.scss"
import $ from "jquery";

import { DateHandler } from "./services/dateHandler";
import { RenderData } from "./services/renderData";
import { HoverHader } from "./services/hoverHander";
import { TaskHandler } from "./services/taskHandler";

let dateHandler = new DateHandler(new Date);
let renderData = new RenderData()
let hoverHander = new HoverHader()
let taskHandler = new TaskHandler()

let tasksField = $(".tasks")
let taskMarker = $(".task__marker")
let weekDateField = $('.week-card__header')
let days = $('[data-day]')


$(document).ready(function () {
    let datesOfDays = dateHandler.initWeekDates()
    let datesSpecs = dateHandler.getDatesSpecs()

    renderData.renderDateIn(weekDateField, datesSpecs)
    renderData.addDatesToDays(datesOfDays, days)

    // hoverHander.hoverOverTask(taskMarker)

    tasksField.on("click", function(event){
        let target = $(event.target);

        if (target.hasClass('task__marker-placeholder') && target[0].dataset.hover != "hover"){
            taskHandler.getTaskReady(target)
            taskHandler.addTask(target)
        }

        if(target.hasClass("task__button-done")){
            taskHandler.addTask(target)
        }

        if (target.hasClass("task__input")){
            taskHandler.updateTaskName(target)
        }

        if (target[0].dataset.hover == "hover"){
            taskHandler.addTaskField(target)
        }

    })
});