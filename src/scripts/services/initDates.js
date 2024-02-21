import { DateHandler } from "./dateHandler";
import { RenderData } from "./renderData";
import $ from "jquery";

let dateHandler = new DateHandler();
let renderData = new RenderData()

let weekDateField = $('.week-card__header')
let days = $('[data-day]')

export class InitDates{
    constructor(){
        this.datesOfDays;
    }

    updateAndRenderDates(fullDate){
        this.datesOfDays = dateHandler.initWeekDates(fullDate)
        let datesSpecs = dateHandler.getDatesSpecs()
        renderData.renderDateIn(weekDateField, datesSpecs)
        renderData.addDatesToDays(this.datesOfDays, days)
    }
}