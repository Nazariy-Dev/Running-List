import { DateHandler } from "./dateHandler";
import { WeekHandler } from "./weekHander";
import { IndexedDB } from "./IndexedDB";
let weekHandler = new WeekHandler()
let dateHandlerMain = new DateHandler()
let indexedDB = new IndexedDB()

export class Initalizer {

    displayWeek({ date, tasksField, weekTextInput }) {
        return new Promise((resolve, reject) => {
            indexedDB.initialize()
                .then((database) => {
                    this.DB = database;
                    let daysOfWeek = dateHandlerMain.initWeekDates(date)
                    this.mondayDate = daysOfWeek[0]
                    let week = weekHandler.findWeek(this.mondayDate, this.DB)
                    return week
                })
                .then((weekFromDB) => {
                    let week = weekFromDB

                    if (weekFromDB.foundWeek == undefined) {
                        let addedWeek = weekHandler.craateWeekObj(this.mondayDate)
                        let foundWeek = weekHandler.addWeekToDB(addedWeek, this.DB)
                        foundWeek.then(res => {
                            week = res
                            // debugger
                            resolve({
                                DB: this.DB,
                                mondayDate: this.mondayDate,
                                week: week
                            })
                        })
                        weekHandler.renderWeek(addedWeek, tasksField, weekTextInput, this.mondayDate)
                    } else {
                        weekHandler.renderWeek(weekFromDB.foundWeek, tasksField, weekTextInput, this.mondayDate)
                        // debugger
                        resolve({
                            DB: this.DB,
                            mondayDate: this.mondayDate,
                            week: week
                        })
                    }
                })
        })

    }
}