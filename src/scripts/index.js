import "../styles/main.scss"
import $, { event } from "jquery";

import { DateHandler } from "./services/dateHandler";
import { RenderData } from "./services/renderData";
import { ShowAssets } from "./services/hoverHander";
import { TaskHandler } from "./services/taskHandler";

let dateHandler = new DateHandler(new Date);
let renderData = new RenderData()
let hoverHander = new ShowAssets()
let taskHandler = new TaskHandler()

let tasksField = $(".tasks")
let taskMarker = $(".task__marker")
let weekDateField = $('.week-card__header')
let days = $('[data-day]')


$(document).ready(function () {
    var isHolding = false;
    var clickDisabled = false;
    let timeoutId = 0;
    let firstHold = true;

    let datesOfDays = dateHandler.initWeekDates()
    let datesSpecs = dateHandler.getDatesSpecs()
    renderData.renderDateIn(weekDateField, datesSpecs)
    renderData.addDatesToDays(datesOfDays, days)

    $(document).on("click", function (event) {
        if (!isHolding && !clickDisabled) {
            console.log("mouseup")
            let target = $(event.target);
            if (target.closest(".more-box").length == 0 || target.hasClass("more-box__image")) {
                $(".more-box").removeClass("more-box_toggle")
                $(".more-box").off("click")
            }
        }
    })

    tasksField.on("click", function (event) {
        if (!isHolding && !clickDisabled) {
            let target = $(event.target);
            if (target.hasClass('task__marker-placeholder') && target[0].dataset.hover != "hover" && target[0].dataset.state != "done") {
                taskHandler.getTaskReady(target)
                taskHandler.addTask(target)
            } else if (target.hasClass("task__button-done")) {
                taskHandler.addTask(target)
            } else if (target.hasClass("task__button-cancel")) {
                taskHandler.candelAdddition(target)
            } else if (target.hasClass("task__input")) {
                taskHandler.updateTaskName(target)
            } else if (target[0].dataset.hover == "hover") {
                taskHandler.addTaskField(target)
            }
        }
    })

    tasksField.on("mousedown", function (event) {
        isHolding = true;
        let target = $(event.target);

        if (target.hasClass('task__marker-placeholder') && target[0].dataset.hover != "hover" && firstHold) {
            timeoutId = setTimeout(function () {
                hoverHander.showBoxMenu(target)

                clickDisabled = true;
            }, 500);
        }
    }).on('mouseleave mouseup', function () {
        clearTimeout(timeoutId);
        isHolding = false;

        setTimeout(function () {
            clickDisabled = false;
        }, 300); // A
    })
})