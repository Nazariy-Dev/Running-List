import $ from "jquery"

export class RenderData {
    renderDateIn(selector, dateSpecs) {
        let { currentMonthName, mondaySpecs, sundaySpecs } = dateSpecs
        selector.html(`${currentMonthName}: <span>${mondaySpecs.mondaDate}/${mondaySpecs.mondayMonth} - ${sundaySpecs.sundaDate}/${sundaySpecs.sundayMonth}</span>`)
    }

    addDatesToDays(datesOfDays) {
        let days = $('[data-day]')
        for (let index = 0; index < days.length; index++) {
            days[index].dataset.date = datesOfDays[index]
        }
    }
}