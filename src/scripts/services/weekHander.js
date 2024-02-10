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

    renderWeek(week, heroBody, tasksField, weekTextInput) {
        let mondaDate = new Date(week.mondayDate)
        let tasks = week.tasks

        let initDates = new InitDates(mondaDate)

        initDates.updateAndRenderDates()

        this.renderTasksHtml(tasksField, tasks, weekTextInput)
        weekTextInput.val(week.weekReview)

        //     `<div class="week-card">
        //     <div class="week-card__header section-header">Month: 14/05 - 21/05</div>
        //     <div class="week-card__days-line days-line">
        //         <div class="days-line__days">
        //             <div class="days-line__day" data-day="1" data-date>M</div>
        //             <div class="days-line__day" data-day="2" data-date>T</div>
        //             <div class="days-line__day" data-day="3" data-date>W</div>
        //             <div class="days-line__day" data-day="4" data-date>T</div>
        //             <div class="days-line__day" data-day="5" data-date>F</div>
        //             <div class="days-line__day" data-day="6" data-date>S</div>
        //             <div class="days-line__day" data-day="0" data-date>S</div>
        //         </div>
        //         <div class="days-line__text">Running List</div>
        //     </div>
        //     <div class="week-card__tasks tasks">
        //         <div class="tasks__task task" data-id="1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed">
        //             <div class="task__marker">
        //                 <div class="task__marker-placeholder" data-day-reference="1" data-state> </div>
        //             </div>
        //             <div class="task__marker">
        //                 <div class="task__marker-placeholder" data-day-reference="2" data-state> </div>
        //             </div>
        //             <div class="task__marker">
        //                 <div class="task__marker-placeholder" data-day-reference="3" data-state> </div>
        //             </div>
        //             <div class="task__marker">
        //                 <div class="task__marker-placeholder" data-day-reference="4" data-state> </div>
        //             </div>
        //             <div class="task__marker">
        //                 <div class="task__marker-placeholder" data-day-reference="5" data-state> </div>
        //             </div>
        //             <div class="task__marker">
        //                 <div class="task__marker-placeholder" data-day-reference="6" data-state> </div>
        //             </div>
        //             <div class="task__marker">
        //                 <div class="task__marker-placeholder" data-day-reference="0" data-state> </div>
        //             </div>
        //             <div class="input-sizer task__label"><input class="task__input" type="text"
        //                 oninput="this.parentNode.dataset.value = this.value" size="4" placeholder="Task">
        //             </div>
        //             <div class="task__buttons-wrapper">
        //                 <div class="task__buttons"><button
        //                     class="task__button task__button-done">Done</button><button
        //                         class="task__button task__button-cancel">Cancel</button></div>
        //             </div>
        //         </div>
        //         <div class="tasks__hover">
        //             <div class="task__marker">
        //                 <div class="task__marker-placeholder" data-day-reference="1" data-hover="hover"> </div>
        //             </div>
        //             <div class="task__marker">
        //                 <div class="task__marker-placeholder" data-day-reference="2" data-hover="hover"> </div>
        //             </div>
        //             <div class="task__marker">
        //                 <div class="task__marker-placeholder" data-day-reference="3" data-hover="hover"> </div>
        //             </div>
        //             <div class="task__marker">
        //                 <div class="task__marker-placeholder" data-day-reference="4" data-hover="hover"> </div>
        //             </div>
        //             <div class="task__marker">
        //                 <div class="task__marker-placeholder" data-day-reference="5" data-hover="hover"> </div>
        //             </div>
        //             <div class="task__marker">
        //                 <div class="task__marker-placeholder" data-day-reference="6" data-hover="hover"> </div>
        //             </div>
        //             <div class="task__marker">
        //                 <div class="task__marker-placeholder" data-day-reference="0" data-hover="hover"> </div>
        //             </div>
        //         </div>
        //         <div class="task__more-box more-box"><img class="more-box__image" src="img/Done.svg"
        //             data-state="done" alt=""><img class="more-box__image" src="img/Deligate.svg"
        //                 data-state="deligated" alt=""><img class="more-box__image" src="img/Undone.svg"
        //                     data-state="undone" alt=""><img class="more-box__image" src="img/Added.svg"
        //                         data-state="assigned" alt=""></div>
        //                 </div>
        //             </div>
        //             <div class="week-rewiew">
        //                 <div class="week-rewiew__header">
        //                     <div class="header-text section-header">Week Review</div>
        //                     <div class="task__buttons-wrapper">
        //                         <div class="task__buttons"><button
        //                             class="task__button task__button-done">Done</button><button
        //                                 class="task__button task__button-cancel">Cancel</button></div>
        //                     </div>
        //                 </div><textarea class="week-rewiew__text"></textarea>
        // </div>`
    }

    renderTasksHtml(tasksField, tasks, weekTextInput) {
        tasksField.html("") 

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
                <div class="tasks__task task" data-id="${task.id}">
                <div class="task__marker"><div class="task__marker-placeholder" data-day-reference="1" data-state="">
                </div></div><div class="task__marker"><div class="task__marker-placeholder" data-day-reference="2" data-state="">
                </div></div><div class="task__marker"><div class="task__marker-placeholder" data-day-reference="3" data-state="">
                </div></div><div class="task__marker"><div class="task__marker-placeholder" data-day-reference="4" data-state="">
                </div></div><div class="task__marker"><div class="task__marker-placeholder" data-day-reference="5" data-state="">
                </div></div><div class="task__marker"><div class="task__marker-placeholder" data-day-reference="6" data-state="">
                </div></div><div class="task__marker"><div class="task__marker-placeholder" data-day-reference="0" data-state="">
                </div></div><div class="input-sizer task__label"><input class="task__input" type="text" oninput="this.parentNode.dataset.value = this.value" size="4" placeholder="Task"></div><div class="task__buttons-wrapper"><div class="task__buttons"><button class="task__button task__button-done">Done</button><button class="task__button task__button-cancel">Cancel</button></div></div>
                </div>
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

    renderDaysHtml(dates) {

    }
}