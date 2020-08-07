import DailySchedule from './DailySchedule'
import Calendar from './Calendar'

export default class MonthlySchedule {
  constructor(year, month) {
    this.year     = year
    this.month    = month
    this.calendar = new Calendar(year, month)
    this.items = []
    for (let date of this.calendar.flatten()) {
      this.items.push(new DailySchedule(year, month, date.date))
    }
  }
}