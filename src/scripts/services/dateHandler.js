export class DateHandler{

    constructor(){
        this.date = new Date();
        this.mondayFullDate;
        this.sundayFullDate;
    }

    initWeekDates(){
        this.mondayFullDate = this.getMondayFullDate()
        this.sundayFullDate = this.getSundayFullDate()

        let currentMonthName = this.getMonthName()

        let mondaySpecs = this.getMondaySpecs()
        let sundaySpecs = this.getSundaySpecs()
        
        return {
            currentMonthName,
            mondaySpecs,
            sundaySpecs
        }
    }

    transformDate(number){
        if(number<10){
            return `0${number}`
        } else {
            return number
        }
    }

    getMonthName(){
        let months= ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];
        
        return months[this.date.getMonth()]
    }

    getMondayFullDate() {
        let d = new Date();
        let day = d.getDay();
        let date = d.getDate();
        let mondaDate = date - day + (day == 0 ? -6 : 1); // adjust when day is sunday
        return new Date(d.setDate(mondaDate))
    }

    getSundayFullDate() {
        let d = new Date();
        let day = d.getDay();
        let date = d.getDate();
        let fridayDate = date + (6 - day) + (day == 0 ? -6 : 1); // adjust when day is sunday
        return new Date(d.setDate(fridayDate))
    }

    getMondaySpecs(){
        let mondaDate = this.mondayFullDate.getDate()
        mondaDate = this.transformDate(mondaDate)

        let mondayMonth = this.mondayFullDate.getMonth() + 1
        mondayMonth = this.transformDate(mondayMonth)

        return {
            mondaDate,
            mondayMonth
        }
    }
    getSundaySpecs(){
        let sundaDate = this.sundayFullDate.getDate()
        sundaDate = this.transformDate(sundaDate)
        
        let sundayMonth = this.sundayFullDate.getMonth() + 1
        sundayMonth = this.transformDate(sundayMonth)

        return {
            sundaDate,
            sundayMonth
        }
    }

    initDatesOfDays(){
        let d = new Date()
        let mondayDate = this.mondayFullDate.getDate()
        let datesOfDays = []
        for (let index = 0; index < 5; index++) {
            datesOfDays[index] = new Date(d.setDate(++mondayDate))
            
        }

        datesOfDays.unshift(this.mondayFullDate)
        datesOfDays.push(this.sundayFullDate)
    }
}