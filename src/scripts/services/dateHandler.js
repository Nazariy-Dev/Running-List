export class DateHandler {

    constructor() {
        this.currentDate;
        this.mondayFullDate;
        this.sundayFullDate;
        this.week
    }

    initWeekDates(fullDate) {
        this.currentDate = fullDate
        this.week = new Array();
        let stringDate = JSON.stringify(this.currentDate)
        let constDate = JSON.parse(stringDate)
        let date = this.currentDate.getDate()
        let day = this.currentDate.getDay()

        let first = ((date - day) + (day == 0 ? -6 : 1));

        for (let i = 0; i < 7; i++) {
            let newDate = new Date(this.currentDate.setDate(first++))
            this.week.push(newDate);
            this.currentDate = new Date(constDate)
        }
        return this.week
    }

    getDatesSpecs() {
        this.mondayFullDate = this.week[0]
        this.sundayFullDate = this.week[6]

        let currentMonthName = this.getMonthName()

        let mondaySpecs = this.getMondaySpecs()
        let sundaySpecs = this.getSundaySpecs()


        return {
            currentMonthName,
            mondaySpecs,
            sundaySpecs
        }
    }

    transformDate(number) {
        if (number < 10) {
            return `0${number}`
        } else {
            return number
        }
    }

    getMonthName() {
        let months = ["January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"];

        return months[this.currentDate.getMonth()]
    }

    getMondaySpecs() {
        let mondaDate = this.mondayFullDate.getDate()
        mondaDate = this.transformDate(mondaDate)

        let mondayMonth = this.mondayFullDate.getMonth() + 1
        mondayMonth = this.transformDate(mondayMonth)

        return {
            mondaDate,
            mondayMonth
        }
    }
    getSundaySpecs() {
        let sundaDate = this.sundayFullDate.getDate()
        sundaDate = this.transformDate(sundaDate)

        let sundayMonth = this.sundayFullDate.getMonth() + 1
        sundayMonth = this.transformDate(sundayMonth)

        return {
            sundaDate,
            sundayMonth
        }
    }


}