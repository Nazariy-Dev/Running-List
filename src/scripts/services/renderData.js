import $ from "jquery"

export class RenderData {
    renderDateIn(selector, dateSpecs) {
        let { currentMonthName, mondaySpecs, sundaySpecs } = dateSpecs
        selector.html(`${currentMonthName}: <span>${mondaySpecs.mondaDate}/${mondaySpecs.mondayMonth} - ${sundaySpecs.sundaDate}/${sundaySpecs.sundayMonth}</span>`)
    }

    addDatesToDays(datesOfDays, daysSelector) {
        for (let index = 0; index < daysSelector.length; index++) {
            daysSelector[index].dataset.date = datesOfDays[index]
        }
    }

    
}