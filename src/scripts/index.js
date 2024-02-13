import "../styles/main.scss"
import $ from "jquery";

import { DateHandler } from "./services/dateHandler";
import { ShowBoxMenu } from "./services/hoverHander";
import { TaskHandler } from "./services/taskHandler";
import { InitDates } from "./services/initDates";
import { Messages } from "./services/messages";
import { WeekHandler } from "./services/weekHander";

let showBoxMenu = new ShowBoxMenu()
let taskHandler = new TaskHandler()
let initDates = new InitDates()
let messages = new Messages()
let weekHandler = new WeekHandler()
let dateHandlerMain = new DateHandler()

let heroBody = $(".hero__body")
let weekTextInput = $(".week-rewiew__text")
let weekContainer = $(".week-rewiew")
let tasksField = $(".tasks")
let weekButtons = weekContainer.find(".task__buttons-wrapper")
let dateInput = $("#date-input")


$(document).ready(function () {
    var clickDisabled = false;
    let timeoutId = 0;
    let firstHold = true;

    initDates.updateAndRenderDates(new Date())
    // initDates.addMondayDate()
    let daysOfWeek = dateHandlerMain.initWeekDates(new Date())
    let mondayDate = daysOfWeek[0]

    let week = weekHandler.findWeek(mondayDate)

    weekHandler.renderWeek(week, tasksField, weekTextInput)


    $(document).on("click", function (event) {
        let target = $(event.target);
        if (!clickDisabled) {
            if (target.closest(".more-box").length == 0 || target.hasClass("more-box__image")) {
                $(".more-box").removeClass("more-box_toggle")
                $(".more-box").off("click")
            }
        }

        if (target.closest(".week-rewiew").length != 0) {
            if (target.hasClass("task__button-done")) {
                let weekText = $(".week-rewiew__text").val()
                taskHandler.addWeekInfo(weekText)
                weekButtons.fadeOut(50)
            } else if (target.hasClass("task__button-cancel")) {
                console.log(target.closest(".week-rewiew"))
                let exitConfirmed = messages.confirmExit()
                if (exitConfirmed)
                    weekButtons.fadeOut(50)
            }

        }
    })

    dateInput.on("change", () => {
        let inputDate = dateInput.val()
        let date = new Date(inputDate)
        let dateHandler = new DateHandler()

        let daysOfWeek = dateHandler.initWeekDates(date)
        let mondaDate = daysOfWeek[0]

        let week = weekHandler.findWeek(mondaDate)
        weekHandler.renderWeek(week, tasksField, weekTextInput)


    })

    weekTextInput.on("focus", (event) => {
        weekButtons.fadeIn(50)
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
                let exitConfirmed = messages.confirmExit()
                if (exitConfirmed)
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