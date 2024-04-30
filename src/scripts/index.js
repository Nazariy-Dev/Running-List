import "../styles/main.scss"
import $ from "jquery";

import { DateHandler } from "./services/dateHandler";
import { ShowBoxMenu } from "./services/hoverHander";
import { TaskHandler } from "./services/taskHandler";
import { InitDates } from "./services/initDates";
// import { Messages } from "./services/messages";
import { WeekHandler } from "./services/weekHander";
import { IndexedDB } from "./services/IndexedDB";
import { Initalizer } from "./services/initialization";

let showBoxMenu = new ShowBoxMenu()
let taskHandler = new TaskHandler()
let initDates = new InitDates()
let weekHandler = new WeekHandler()
let dateHandlerMain = new DateHandler()
let indexedDB = new IndexedDB()

let weekTextInput = $(".week-rewiew__text")
let weekContainer = $(".week-rewiew")
let tasksField = $(".tasks")
let weekButtons = weekContainer.find(".task__buttons-wrapper")
let dateInput = $("#date-input")



$(document).ready(function () {
    var clickDisabled = false;
    let timeoutId = 0;
    let firstHold = true;
    let DB;
    let mondayDate;
    let week;

    let params = { date: new Date, tasksField, weekTextInput }

    let initalizer = new Initalizer()
    let returnData = initalizer.displayWeek(params)

    returnData.then((data) => {
        week = data.week,
        DB = data.DB,
        mondayDate = data.mondayDate
    })

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
                weekButtons.fadeOut(50)
                taskHandler.addWeekInfo(DB, weekText, week.weekIndex)
            }
            // else if (target.hasClass("task__button-cancel")) {
            //     let exitConfirmed = messages.confirmExit()
            //     if (exitConfirmed)
            //         weekButtons.fadeOut(50)
            // }

        }
    })

    dateInput.on("change", () => {
        let inputDate = dateInput.val()
        let date = new Date(inputDate)

        let params = { date, tasksField, weekTextInput }

        let initalizer = new Initalizer()
        let returnData = initalizer.displayWeek(params)
        returnData.then((data) => {
            week = data.week,
            DB = data.DB,
            mondayDate = data.mondayDate
        })
    })

    weekTextInput.on("focus", () => {
        weekButtons.fadeIn(50)
    })

    tasksField.on("click", function (event) {

        if (!clickDisabled) {
            let target = $(event.target);
            if (target.hasClass('task__marker-placeholder') && target[0].dataset.hover != "hover" && (target[0].dataset.state == "" || target[0].dataset.state == "assigned")) {
                taskHandler.getTaskReady(target, mondayDate)
                taskHandler.addTask(target, mondayDate, week.weekIndex, DB)
            } else if (target.hasClass("task__button-done")) {
                taskHandler.addTask(target, mondayDate, week.weekIndex, DB)
            }
            // else if (target.hasClass("task__button-cancel")) {
            //     let exitConfirmed = messages.confirmExit()
            //     if (exitConfirmed)
            //         taskHandler.candelAdddition(target)
            // } 
            else if (target.hasClass("task__input")) {
                taskHandler.updateTaskName(target)
            } else if (target[0].dataset.hover == "hover") {
                taskHandler.addTaskField(target, mondayDate, week.weekIndex, DB)
            } else if (target.hasClass("task__delete-btn")) {
                taskHandler.deleteTask(target, DB, week.weekIndex)
            }
        }
    })

    tasksField.on("mousedown touchstart", function (event) {
        let target = $(event.target);

        if (target.hasClass('task__marker-placeholder') && target[0].dataset.hover != "hover" && firstHold) {
            timeoutId = setTimeout(function () {
                showBoxMenu.showBoxMenu(target, mondayDate, week.weekIndex, DB)

                clickDisabled = true;
            }, 500);
        }
    }).on('mouseleave mouseup touchend', function () {

        clearTimeout(timeoutId);

        setTimeout(function () {
            clickDisabled = false;
        }, 300); // A
    }).on("contextmenu", (event) => {
        event.preventDefault()
    })

    tasksField.on("keyup", (e) => {
        let input = $(e.target)

        if (e.key === 'Enter' || e.code === 13) {
            taskHandler.addTask(input, mondayDate, week.weekIndex, DB)
        }
        // else if (e.key === "Escape") {
        //     let exitConfirmed = messages.confirmExit()
        //     if (exitConfirmed) {
        //         taskHandler.candelAdddition(input)
        //     }
        // }
    })

    weekTextInput.on("keyup", (e) => {
        let input = $(e.target)
        if (e.key === 'Enter' || e.code === 13) {
            let weekText = $(".week-rewiew__text").val()
            weekButtons.fadeOut(50)
            input.blur()
            taskHandler.addWeekInfo(DB, weekText, week.weekIndex)
        }
        // else if (e.key === "Escape") {
        //     let exitConfirmed = messages.confirmExit()
        //     if (exitConfirmed) {
        //         weekButtons.fadeOut(50)
        //         input.blur()
        //     }
        // }
    })
})