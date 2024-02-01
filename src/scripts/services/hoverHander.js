import $, { event } from "jquery";
import { TaskHandler } from "./taskHandler";

let taskHandler = new TaskHandler()
export class ShowAssets {
    constructor() {
        this.boxMenu = $(".more-box")
        this.boxTarget;
    }

    showBoxMenu(boxTarget) {
        this.boxTarget = boxTarget

        let boxParent = this.boxTarget.parent()
        let boxTop = boxParent.position().top
        let boxLeft = boxParent.position().left

        this.boxMenu.css({
            "top": `${boxTop + 10}px`,
            "left": `${boxLeft + 10}px`
        })
        this.boxMenu.addClass("more-box_toggle")

        this.boxMenu.on("click", event => {
            let target = $(event.target)
            let box = this.boxTarget
            if (target.hasClass("more-box__image")) {
                let state = target[0].dataset.state
                taskHandler.addBackround(box, state)
            }
        })
    }
}