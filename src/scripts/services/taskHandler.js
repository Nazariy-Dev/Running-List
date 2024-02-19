import $ from "jquery";
import { week } from "./week";
import weeks from "./weeks.json"

import { v4 as uuidv4 } from 'uuid';
import { InitDates } from "./initDates";
import { IndexedDB } from "./IndexedDB";

import doneURl from "../../assets/icons/Done.svg"
import addedURl from "../../assets/icons/Added.svg"
import undoneUrl from "../../assets/icons/Undone.svg"
import deligatedUrl from "../../assets/icons/Deligate.svg"

let initDates = new InitDates()
let indexedDB = new IndexedDB()


export class TaskHandler {
    getTaskReady(boxTarget, mondaDate) {
        boxTarget = $(boxTarget)
        let task = boxTarget.closest(".task")
        let input = task.find('.task__input')

        if (boxTarget[0].dataset.state == "assigned") {
            boxTarget[0].dataset.state = "done"
            this.addBackround(boxTarget, "done")
        } else if(boxTarget[0].dataset.state == "done"){
            this.addBackround(boxTarget, "done")
        } else {
            if(input[0].value.length == 0) {
                this.updateTaskName(input, mondaDate)
            }
            boxTarget[0].dataset.state = "assigned"
            this.addBackround(boxTarget, "assigned")
        }
    }

    getTaskReadyFromMenu(boxTarget, state){
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
            } else if (state == "done"){
                url = doneURl
            
            } else if (state == "undone"){
                url = undoneUrl
            
            } else if (state == "deligated"){
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
        console.log("add task")
        initDates.updateAndRenderDates(new Date(mondayDate))
        
        let task = taskElem.closest(".task")
        let input = task.find('.task__label')
        let buttons = task.find(".task__buttons-wrapper")
        let assignedDays = task.find("[data-state]")
            .filter((index, value) => {
                return value.dataset.state.length > 0
            })

        let dateData = []
        let taskName = input[0].dataset.value || "No title"

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

        weeks.weeks[weekIndex].tasks.forEach((taskDB) => {
            if (task[0].dataset.id == taskDB.id) {
                isFound = true

                taskDB.taskName = taskName
                taskDB.dates = dateData
                return
            }
        })

        console.log(weeks.weeks[weekIndex].tasks)

        if (!isFound) {
            weeks.weeks[weekIndex].tasks.push({
                id: task[0].dataset.id,
                dates: dateData,
                taskName,
            })
        }

        if (buttons.css("display") != "none" && !taskElem.hasClass("task__marker-placeholder"))
            buttons.fadeOut(50)
            
        // console.log(JSON.stringify(week))
        
        // indexedDB.addTask(week, DB)
        weeks.weeks[weekIndex].tasks = weeks.weeks[weekIndex].tasks
        console.log(weeks)
     

    }

    updateTaskName(input, mondayDate) {
        let task = input.closest(".task")
        let buttons = task.find(".task__buttons-wrapper")
        buttons.fadeIn(50)
        input.select()
    }

    addTaskField(boxTarget, mondayDate, weekIndex) {
        let id = uuidv4()
        let dayReference = boxTarget[0].dataset.dayReference

        let tasks = $(".tasks")
        let taskHTML = `
            <div class="tasks__task task" data-id="${id}">
                <div class="task__marker"><div class="task__marker-placeholder" data-day-reference="1" data-state="">
                </div></div><div class="task__marker"><div class="task__marker-placeholder" data-day-reference="2" data-state="">
                </div></div><div class="task__marker"><div class="task__marker-placeholder" data-day-reference="3" data-state="">
                </div></div><div class="task__marker"><div class="task__marker-placeholder" data-day-reference="4" data-state="">
                </div></div><div class="task__marker"><div class="task__marker-placeholder" data-day-reference="5" data-state="">
                </div></div><div class="task__marker"><div class="task__marker-placeholder" data-day-reference="6" data-state="">
                </div></div><div class="task__marker"><div class="task__marker-placeholder" data-day-reference="0" data-state="">
                </div></div><div class="input-sizer task__label"><input class="task__input" type="text" oninput="this.parentNode.dataset.value = this.value" size="4" placeholder="Task"></div><div class="task__buttons-wrapper"><div class="task__buttons"><button class="task__button task__button-done">Done</button><button class="task__button task__button-cancel">Cancel</button></div></div>
            </div>
        `
        tasks.append(taskHTML)
        let task = tasks.find(`[data-id="${id}`)
        let day = task.find(`[data-day-reference=${dayReference}]`)
        this.getTaskReady(day)
        this.addTask(day, mondayDate, weekIndex)
    }

    candelAdddition(button){
        let task = button.closest(".task")
        let input = task.find(".task__input")
        let buttons = task.find(".task__buttons-wrapper")
        buttons.fadeOut(50)
        input.blur()
    }

    addWeekInfo(weekText, weekIndex){
        // week.weekReview = weekText
        weeks.weeks[weekIndex].weekReview = weekText
        console.log(weeks)

    }

}