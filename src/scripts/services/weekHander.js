import $, { data, error } from "jquery";
import weeks from "./weeks.json"
import { InitDates } from "./initDates";
import { TaskHandler } from "./taskHandler";
import { v4 as uuidv4 } from 'uuid';
import { IndexedDB } from "./IndexedDB";

let taskHandler = new TaskHandler()
let indexedDB = new IndexedDB()

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
        let weekIndex;
        // weeks.weeks.push(week)
        // let index = weeks.weeks.indexOf(week)
        indexedDB.addWeek(week, DB)
        foundWeek = this.findWeek(week.mondayDate, DB)
        return foundWeek
    }

    renderWeek(week, tasksField, weekTextInput, mondayDate) {
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
            let divTask = this.createTaskDiv()
            tasksField.append(divTask)
            return
        }

        tasks.forEach(task => {
            let divTask = this.createTaskDiv(task)
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

    createTaskDiv(task, ...args) {
        let divTask = $('<div>',
            {
                class: 'tasks__task task',
            }
        )

        if (args.length == 0) {
            divTask[0].dataset.id = uuidv4()
        } else {
            divTask[0].dataset.id = task.id

        }


        divTask.html(`
        <div class="task__marker"><div class="task__marker-placeholder" data-day-reference="1" data-state="">
        </div></div><div class="task__marker"><div class="task__marker-placeholder" data-day-reference="2" data-state="">
        </div></div><div class="task__marker"><div class="task__marker-placeholder" data-day-reference="3" data-state="">
        </div></div><div class="task__marker"><div class="task__marker-placeholder" data-day-reference="4" data-state="">
        </div></div><div class="task__marker"><div class="task__marker-placeholder" data-day-reference="5" data-state="">
        </div></div><div class="task__marker"><div class="task__marker-placeholder" data-day-reference="6" data-state="">
        </div></div><div class="task__marker"><div class="task__marker-placeholder" data-day-reference="0" data-state="">
        </div></div><div class="input-sizer task__label"><input class="task__input" type="text" oninput="this.parentNode.dataset.value = this.value" size="4" placeholder="Task"></div><div class="task__buttons-wrapper"><div class="task__buttons"><button class="task__button task__button-done">Done</button><button class="task__button task__button-cancel">Cancel</button></div></div>
        `)

        return divTask
    }
}