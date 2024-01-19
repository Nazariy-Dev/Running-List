import $ from "jquery";
export class HoverHader {
    hoverOverTask(task) {
        task.hover(
            function () {
                $(".tasks__hover").css("visibility", "visible")
            },
            function () {
                $(".tasks__hover").css("visibility", "hidden");
            })
    }
}