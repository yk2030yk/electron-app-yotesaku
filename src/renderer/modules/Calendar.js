import { isDefined } from './util/util'
import {
  isHoliday,
  isToday,
  getFirstDate,
  getLastDate
} from './util/date'

export const WEEK_STRINGS = [
  "日", "月", "火", "水", "木", "金", "土"
]

export default class Calendar {
  constructor(year, month) {
    this.year = year
    this.month = month
    this.calendar = this.createCalendar()
  }

  createCalendar() {
    const startDay = getFirstDate(this.year, this.month).getDay()
    const lastDate = getLastDate(this.year, this.month).getDate()
    let calendar = []
    let date = 1;
    for (let row = 0; row < 6; row++) {
      if (date > lastDate) break;

      let week = [];
      for (let col = 0; col < 7; col++) {
        if (row === 0 && col < startDay || date > lastDate) {
          week.push(null)
        } else {
          const d = new Date(this.year, this.month - 1, date++)
          week.push({
            year:  d.getFullYear(),
            month: d.getMonth() + 1,
            date:  d.getDate(),
            week:  WEEK_STRINGS[d.getDay()],
            isToday: isToday(d)
          })
        }
      }
      if (week.length !== 0) calendar.push(week)
    }
    return calendar
  }

  flatten() {
    const flat = Array.prototype.concat.apply([], this.calendar);
    return flat.filter(item => { return isDefined(item) })
  }
}