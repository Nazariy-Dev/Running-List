import $ from "jquery";
import { tasks } from "./tasksDB";

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

    showButtons() {
        buttons = this.task.find(".task__buttons")
        this.buttons.show()
    }

    addTask(taskElem) {
        let task = taskElem.closest(".task")
        let input = task.find('.task__label')
        let buttons = task.find(".task__buttons")
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

                taskDB.taskName = taskName,
                    taskDB.dates = dateData
            } else {
                tasks.push({
                    id: task[0].dataset.id,
                    dates: dateData,
                    taskName,
                })
            }
        })

        if (!isFound) {
            tasks.push({
                id: task[0].dataset.id,
                dates: dateData,
                taskName,
            })
        }

        console.log(tasks)

        buttons.css("display", "none")

    }

    updateTaskName(input) {
        let task = input.closest(".task")
        let buttons = task.find(".task__buttons")
        buttons.show()
        input.select()
    }

}