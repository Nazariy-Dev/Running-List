import $ from "jquery"
import { v4 as uuidv4 } from 'uuid';

export class ElementsCrator {
    createTaskDiv(task) {
        let divTask = $('<div>',
            {
                class: 'tasks__task task',
            }
        )

        if (!task) {
            divTask[0].dataset.id = uuidv4()
        } else {
            divTask[0].dataset.id = task.id
        }


        divTask.html(`
        <div class="task__marker"><div class="task__marker-placeholder" data-day-reference="1" data-state="">
            </div></div><div class="task__marker"><div class="task__marker-placeholder" data-day-reference="2" data-state="">
            </div></div><div class="task__marker"><div class="task__marker-placeholder" data-day-reference="3" data-state="">
            </div></div><div class="task__marker"><div class="task__marker-placeholder" data-day-reference="4" data-state="">
            </div></div><div class="task__marker"><div class="task__marker-placeholder" data-day-reference="5" data-state="">
            </div></div><div class="task__marker"><div class="task__marker-placeholder" data-day-reference="6" data-state="">
            </div></div><div class="task__marker"><div class="task__marker-placeholder" data-day-reference="0" data-state="">
            </div></div><div class="input-sizer task__label"><input class="task__input" type="text" oninput="this.parentNode.dataset.value = this.value" size="4" placeholder="Task">
            </div><div class="task__buttons-wrapper"><div class="task__buttons"><button class="task__button task__button-done">Done</button> 
            <div class="task__delete-btn">
        </div>
        
        `)
        // <button class="task__button task__button-cancel">Cancel</button></div></div>

        return divTask
    }
}