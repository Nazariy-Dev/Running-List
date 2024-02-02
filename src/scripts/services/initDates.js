import { DateHandler } from "./dateHandler";
import { RenderData } from "./renderData";
import $ from "jquery";

let dateHandler = new DateHandler(new Date());
let renderData = new RenderData()

let weekDateField = $('.week-card__header')
let days = $('[data-day]')

export class InitDates{
    updateAndRenderDates(){
        let datesOfDays = dateHandler.initWeekDates()
        let datesSpecs = dateHandler.getDatesSpecs()
        renderData.renderDateIn(weekDateField, datesSpecs)
        renderData.addDatesToDays(datesOfDays, days)
    }
}