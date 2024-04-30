import $ from "jquery";

import { InitDates } from "./initDates";
import { IndexedDB } from "./IndexedDB";
import { ElementsCrator } from "./elementsCreator";


import doneURl from "../../assets/icons/Done.svg"
import addedURl from "../../assets/icons/Added.svg"
import undoneUrl from "../../assets/icons/Undone.svg"
import deligatedUrl from "../../assets/icons/Deligate.svg"

let initDates = new InitDates()
let indexedDB = new IndexedDB()
let elementsCrator = new ElementsCrator()

export class TaskHandler {
    getTaskReady(boxTarget, mondaDate) {
        boxTarget = $(boxTarget)
        let task = boxTarget.closest(".task")
        let input = task.find('.task__input')

        if (boxTarget[0].dataset.state == "assigned") {
            boxTarget[0].dataset.state = "done"
            this.addBackround(boxTarget, "done")
        } else if (boxTarget[0].dataset.state == "done") {
            this.addBackround(boxTarget, "done")
        } else {
            if (input[0].value.length == 0) {
                this.updateTaskName(input, mondaDate)
            }
            boxTarget[0].dataset.state = "assigned"
            this.addBackround(boxTarget, "assigned")
        }
    }

    getTaskReadyFromMenu(boxTarget, state) {
        boxTarget = $(boxTarget)
        let task = boxTarget.closest(".task")
        let input = task.find('.task__input')

        boxTarget[0].dataset.state = state
    }

    addBackround(boxTarget, state) {
        if (boxTarget.closest('.task').length != 0) {
            let url;
            if (state == "assigned") {
                url = addedURl
            } else if (state == "done") {
                url = doneURl

            } else if (state == "undone") {
                url = undoneUrl

            } else if (state == "deligated") {
                url = deligatedUrl
            }

            boxTarget.css({
                "background-image": `url('${url}')`,
                "display": "block",
                "opacity": "1"
            })
        }
    }

    addTask(taskElem, mondayDate, weekIndex, DB) {
        initDates.updateAndRenderDates(new Date(mondayDate))
        let task = taskElem.closest(".task")
        let input = task.find('.task__label')
        let inputField = task.find('.task__input')
        let buttons = task.find(".task__buttons-wrapper")
        let assignedDays = task.find("[data-state]")
            .filter((index, value) => {
                return value.dataset.state.length > 0
            })

        let dateData = []
        let taskName = input[0].dataset.value || ""

        let isFound = false

        assignedDays.each((index, day) => {
            let dayReference = day.dataset.dayReference
            // let dateSpecs = []
            let dates = $('.days-line__days').find(`[data-day=${dayReference}]`)[0].dataset.date
            let state = day.dataset.state

            dateData.push({
                dayOfWeek: dayReference,
                dates,
                state
            })
        })

        if (buttons.css("display") != "none" && !taskElem.hasClass("task__marker-placeholder")) {
            buttons.fadeOut(50)
        }

        inputField.blur()

        let founWeek = indexedDB.getWeek(DB, weekIndex)
        founWeek.then((week) => {
            week.tasks.forEach((taskDB) => {
                if (task[0].dataset.id == taskDB.id) {
                    isFound = true

                    taskDB.taskName = taskName
                    taskDB.dates = dateData
                    return
                }
            })

            if (!isFound) {
                week.tasks.push({
                    id: task[0].dataset.id,
                    dates: dateData,
                    taskName,
                })
            }

            indexedDB.updateWeek(DB, week, weekIndex)
        })

    }

    updateTaskName(input) {
        let task = input.closest(".task")
        let buttons = task.find(".task__buttons-wrapper")
        buttons.fadeIn(50)
        input.select()
    }

    addTaskField(boxTarget, mondayDate, weekIndex, DB) {
        let dayReference = boxTarget[0].dataset.dayReference
        let tasks = $(".tasks")
        let buttons = tasks.find(".task__buttons-wrapper")

        buttons.each((key, button) => {
            button = $(button)
            button.fadeOut(50)
        })

        let newTask = elementsCrator.createTaskDiv()
        tasks.append(newTask)

        let id = newTask[0].dataset.id
        let task = tasks.find(`[data-id="${id}`)
        let day = task.find(`[data-day-reference=${dayReference}]`)
        this.getTaskReady(day)
        this.addTask(day, mondayDate, weekIndex, DB)
    }

    candelAdddition(button) {
        let task = button.closest(".task")
        let input = task.find(".task__input")
        let buttons = task.find(".task__buttons-wrapper")
        buttons.fadeOut(50)
        input.blur()
    }

    addWeekInfo(DB, weekText, weekIndex) {
        let founWeek = indexedDB.getWeek(DB, weekIndex)
        founWeek.then((week) => {
            week.weekReview = weekText
            indexedDB.updateWeek(DB, week, weekIndex)
        })
    }

    deleteTask(taskElem, DB, weekIndex) {
        let task = taskElem.closest(".task")
        let buttons = task.find(".task__buttons-wrapper")

        task.remove()

        if (buttons.css("display") != "none" && !taskElem.hasClass("task__marker-placeholder")) {
            buttons.fadeOut(50)
        }

        let founWeek = indexedDB.getWeek(DB, weekIndex)
        founWeek.then((week) => {

            week.tasks.forEach((taskDB, index) => {
                if (task[0].dataset.id == taskDB.id) {
                    week.tasks.splice(index, 1);
                    return
                }
            })

            indexedDB.updateWeek(DB, week, weekIndex)
        })
    }
}