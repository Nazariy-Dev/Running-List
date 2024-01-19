import $ from "jquery";

export class BoxBackroundHandler {
    addBackround(boxTarget) {
        boxTarget = $(boxTarget)

        if (boxTarget.hasClass("task__marker-placeholder") && boxTarget.closest('.task').length !=0) {
            boxTarget.css({
                "backgroundImage": 'url(../assets/icons/Added.svg")',
                "display": "block",
                "opacity": "1"
            })
            console.log()
        }
    }
}
