import $ from "jquery";
import weeks from "./weeks.json"
import { InitDates } from "./initDates";
import { TaskHandler } from "./taskHandler";

let taskHandler = new TaskHandler()

export class WeekHandler {
    findWeek(mondayDate) {
        let foundWeek = 'not found'

        weeks.weeks.forEach(week => {
            let mondayDateDB = new Date(week.mondayDate)
            let weekDBTime = new Date(mondayDateDB.setHours(2, 0, 0, 0))
            weekDBTime = weekDBTime.getTime()
            mondayDate.setHours(2, 0, 0, 0)
            let calenderTime = new Date(mondayDate).getTime();
            if (weekDBTime == calenderTime) {
                foundWeek = week
                return
            }
        })

        return foundWeek
    }

    renderWeek(week, tasksField, weekTextInput) {
        let mondaDate = new Date(week.mondayDate)
        let tasks = week.tasks

        let initDates = new InitDates()

        initDates.updateAndRenderDates(mondaDate)

        this.renderTasksHtml(tasksField, tasks)
        weekTextInput.val(week.weekReview)
    }

    renderTasksHtml(tasksField, tasks) {
        tasksField.find(".task").remove()

        tasks.forEach(task => {
            let divTask = $('<div>',
                {
                    class: 'tasks__task task',
                }
            )

            divTask[0].dataset.id = task.id

            // this.renderDaysHtml(task.dates)
            console.log("end of task")

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