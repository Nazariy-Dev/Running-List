import $ from "jquery"

export class Task{

    constructor(taksPlaceholder){
        this.taksPlaceholder = taksPlaceholder
        this.task,
        this.input,
        this.buttons,
        this.date
    }

    addTask(){
        
    }

    boxClick(){
        this.task = this.taksPlaceholder.closest(".task")
        this.input = this.task.find(".task__input")
        this.input.focus()

        this.buttons = this.task.find(".task__buttons")
        this.buttons.show()

        let dayReference = this.taksPlaceholder.attr("data-day-reference")

        this.date = $('.days-line__days').find(`[data-day=${dayReference}`).attr("data-date")
    }
}