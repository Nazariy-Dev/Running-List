import { DateHandler } from "./dateHandler";
import { RenderData } from "./renderData";
import { week } from "./tasksDB";
import $ from "jquery";

let dateHandler = new DateHandler(new Date());
let renderData = new RenderData()

let weekDateField = $('.week-card__header')
let days = $('[data-day]')

export class InitDates{
    constructor(){
        this.datesOfDays;
    }

    updateAndRenderDates(){
        this.datesOfDays = dateHandler.initWeekDates()
        let datesSpecs = dateHandler.getDatesSpecs()
        renderData.renderDateIn(weekDateField, datesSpecs)
        renderData.addDatesToDays(this.datesOfDays, days)
    }

    addMondayDate(){
        week.mondayDate = this.datesOfDays[0]
    }
}