import $ from "jquery";

export class TaskHandler{
    constructor(){
        this.tasks = []
        this.task,
        this.dates = []
        this.input,
        this.days = [],
        this.boxTarget
    }

    getTaskReady(boxTarget) {
        this.boxTarget = $(boxTarget)
        this.task = boxTarget.closest(".task")
        this.input = this.task.find(".task__label")
        this.input.find(".task__input").focus()
        let dayReference = (boxTarget.attr("data-day-reference"))
        let date = $('.days-line__days').find(`[data-day=${dayReference}]`).attr("data-date")

        if($.inArray(dayReference, this.days) == -1){
            this.days.push(dayReference)
            this.dates.push({
                dayOfWeek: dayReference,
                date: date
            })
        }

        this.showButtons()
        this.addBackround(boxTarget)
    }

    addBackround(){
        if (this.boxTarget.closest('.task').length !=0) {
            this.boxTarget.css({
                "backgroundImage": 'url(../assets/icons/Added.svg")',
                "display": "block",
                "opacity": "1"
            })
            console.log()
        }
    }

    showButtons(){
        this.buttons = this.task.find(".task__buttons")
        this.buttons.show()
    }

    addTask(){
        let isNotFound = true
        this.buttons.css("display", "none")
        let taskName = this.input[0].dataset.value

        this.tasks.forEach((task) => {
            if(task.id == this.task[0].dataset.id) {
                isNotFound = false
            }
        })

        if(isNotFound) {
            this.tasks.push({
                id: this.task[0].dataset.id,
                date: this.dates,
                taskName,
            })
    
            console.log(this.tasks)
        }
    }

    updateTask(input){
        let buttons = input.closest(".task").find(".task__buttons")
        let doneBnt = buttons.find(".task__button-done")
        
        buttons.show()
        input.select()
    }
    
}