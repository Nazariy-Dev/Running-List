import "../styles/main.scss"
import $ from "jquery";

import { DateHandler } from "./services/dateHandler";
import { RenderData } from "./services/renderData";
import { ShowBoxMenu } from "./services/hoverHander";
import { TaskHandler } from "./services/taskHandler";
import { InitDates } from "./services/initDates";

let showBoxMenu = new ShowBoxMenu()
let taskHandler = new TaskHandler()
let initDates = new InitDates()

let weekTextInput = $(".week-rewiew__text")
let weekContainer = $(".week-rewiew")
let tasksField = $(".tasks")

$(document).ready(function () {
    var clickDisabled = false;
    let timeoutId = 0;
    let firstHold = true;

    initDates.updateAndRenderDates()

    $(document).on("click", function (event) {
        let target = $(event.target);
        if (!clickDisabled) {
            if (target.closest(".more-box").length == 0 || target.hasClass("more-box__image")) {
                $(".more-box").removeClass("more-box_toggle")
                $(".more-box").off("click")
            }
        }
        
        if(target.closest(".week-rewiew")){
            if(target.hasClass("task__button-done")){
                let weekText = $(".week-rewiew__text").val()
                console.log(weekText)
            }
        }
    })

    weekTextInput.on("focus", (event)=>{
        let buttons = weekContainer.find(".task__buttons-wrapper")
        buttons.fadeIn(50)
    })

    tasksField.on("click", function (event) {
        if (!clickDisabled) {
            let target = $(event.target);
            if (target.hasClass('task__marker-placeholder') && target[0].dataset.hover != "hover" && (target[0].dataset.state == "" || target[0].dataset.state == "assigned")) {
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
        let target = $(event.target);

        if (target.hasClass('task__marker-placeholder') && target[0].dataset.hover != "hover" && firstHold) {
            timeoutId = setTimeout(function () {
                showBoxMenu.showBoxMenu(target)

                clickDisabled = true;
            }, 500);
        }
    }).on('mouseleave mouseup', function () {
        clearTimeout(timeoutId);

        setTimeout(function () {
            clickDisabled = false;
        }, 300); // A
    })
})