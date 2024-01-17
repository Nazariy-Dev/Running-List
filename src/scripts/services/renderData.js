export class RenderData{
    renderDateIn(selector, dateSpecs){
        let {currentMonthName, mondaySpecs, sundaySpecs} = dateSpecs

        selector.html(`${currentMonthName}: <span>${mondaySpecs.mondaDate}/${mondaySpecs.mondayMonth} - ${sundaySpecs.sundaDate}/${sundaySpecs.sundayMonth}</span>`)
    }
}