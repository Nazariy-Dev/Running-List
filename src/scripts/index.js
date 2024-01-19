import "../styles/main.scss"
import $ from "jquery";

import { DateHandler } from "./services/dateHandler";
import { RenderData } from "./services/renderData";
import { HoverHader } from "./services/hoverHander";
import { TaskHandler } from "./services/taskHandler";
import { Task } from "./services/task";

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

    hoverHander.hoverOverTask(taskMarker)

    tasksField.on("click", function(event){
        let target = $(event.target);

        if (target.hasClass('task__marker-placeholder')){
            taskHandler.addBackround(target)
            let task = new Task(target)
            task.addTask()
            task.boxClick()
        }
        if(target.hasClass(".task__button-done")){
            taskHandler.addTask()
        }
    })
});