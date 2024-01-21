import $ from "jquery";
import { tasks } from "./tasksDB";
import { v4 as uuidv4 } from 'uuid';

export class TaskHandler {
    getTaskReady(boxTarget) {
        boxTarget = $(boxTarget)
        boxTarget[0].dataset.state = "assigned"
        this.addBackround(boxTarget)
    }

    addBackround(boxTarget) {
        if (boxTarget.closest('.task').length != 0) {
            boxTarget.css({
                "backgroundImage": 'url(../assets/icons/Added.svg")',
                "display": "block",
                "opacity": "1"
            })
            console.log()
        }
    }

    addTask(taskElem) {
        let task = taskElem.closest(".task")
        let input = task.find('.task__label')
        let buttons = task.find(".task__buttons-wrapper")
        let assignedDays = task.find("[data-state='assigned']")

        let dateData = []
        let taskName = input[0].dataset.value

        let isFound = false

        assignedDays.each((index, day) => {
            let dayReference = day.dataset.dayReference
            let dates = $('.days-line__days').find(`[data-day=${dayReference}]`)[0].dataset.date

            dateData.push({
                dayOfWeek: dayReference,
                dates
            })
        })

        tasks.forEach((taskDB) => {
            if (task[0].dataset.id == taskDB.id) {
                isFound = true

                taskDB.taskName = taskName
                taskDB.dates = dateData
                return
            }
        })

        if (!isFound && taskName) {
            tasks.push({
                id: task[0].dataset.id,
                dates: dateData,
                taskName,
            })
        }

        console.log(tasks)

        if(buttons.css("displau") != "none")
        buttons.fadeOut(50)

    }

    updateTaskName(input) {
        let task = input.closest(".task")
        let buttons = task.find(".task__buttons-wrapper")
        buttons.fadeIn(50)
        input.select()
    }

    addTaskField(boxTarget) {
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
        this.addTask(day)
    }

}