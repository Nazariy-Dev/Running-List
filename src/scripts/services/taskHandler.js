import $ from "jquery";

export class TaskHandler{
    constructor(){
        this.tasks = []
    }

    addBackround(boxTarget) {
        boxTarget = $(boxTarget)

        if (boxTarget.closest('.task').length !=0) {
            boxTarget.css({
                "backgroundImage": 'url(../assets/icons/Added.svg")',
                "display": "block",
                "opacity": "1"
            })
            console.log()
        }
    }
}