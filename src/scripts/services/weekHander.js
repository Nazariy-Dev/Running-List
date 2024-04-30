import $, { data, error } from "jquery";
import { InitDates } from "./initDates";
import { TaskHandler } from "./taskHandler";
import { IndexedDB } from "./IndexedDB";
import { ElementsCrator } from "./elementsCreator";


let taskHandler = new TaskHandler()
let indexedDB = new IndexedDB()
let elementsCrator = new ElementsCrator

export class WeekHandler {
    findWeek(mondayDate, DB) {
         return indexedDB.getAllWeeks(DB, mondayDate)
        // indexedDB.getWeek(DB, 2)
        // .then((data)=>{
        //     console.log(data)
        // })
        // .catch((error)=>{
        //     console.log(error.message)
        // })

        // weeks.weeks.forEach((week, index) => {
        //     let mondayDateDB = new Date(week.mondayDate)
        //     let weekDBTime = new Date(mondayDateDB.setHours(2, 0, 0, 0))
        //     weekDBTime = weekDBTime.getTime()
        //     mondayDate.setHours(2, 0, 0, 0)
        //     let calenderTime = new Date(mondayDate).getTime();
        //     if (weekDBTime == calenderTime) {
        //         foundWeek = week
        //         weekIndex = index
        //         return
        //     }
        // })

        // return { foundWeek, weekIndex }
    }

    craateWeekObj(mondayDate) {
        let weekObj = {
            mondayDate,
            tasks: [],
            weekReview: ""
        }

        return weekObj
    }

    addWeekToDB(week, DB) {
        let foundWeek;

        indexedDB.addWeek(week, DB)
        foundWeek = this.findWeek(week.mondayDate, DB)
        return foundWeek
    }

    renderWeek(week, tasksField, weekTextInput) {
        let mondaDate = new Date(week.mondayDate)
        let tasks = week.tasks

        let initDates = new InitDates()

        initDates.updateAndRenderDates(mondaDate)

        this.renderTasksHtml(tasksField, tasks)
        weekTextInput.val(week.weekReview || "")
    }

    renderTasksHtml(tasksField, tasks) {

        tasksField.find(".task").remove()

        if (tasks.length == 0) {
            let divTask = elementsCrator.createTaskDiv()
            tasksField.append(divTask)
            return
        }

        tasks.forEach(task => {
            let divTask = elementsCrator.createTaskDiv(task)
            let input = divTask.find(".task__input")
            input.val(task.taskName)
            input.parent()[0].dataset.value = task.taskName

            task.dates.forEach(date => {
                let dayReference = date.dayOfWeek
                let day = divTask.find(`[data-day-reference=${dayReference}]`)
                let state = date.state
                day[0].dataset.state = state
                taskHandler.addBackround(day, state)
            })

            tasksField.append(divTask)
        })
    }

    
}