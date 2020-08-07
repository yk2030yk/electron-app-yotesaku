import {
  compareTime
} from './util/time'
import { createUniqueId } from './util/util'

const DEAULT_TIME = '00:00'
export default class ScheduleItem {
  constructor(year, month, date) {
    this.setValues({
      year         : year,
      month        : month,
      date         : date,
      startTime    : DEAULT_TIME,
      endTime      : DEAULT_TIME,
      category_a_id: '',
      category_b_id: '',
      category_c_id: '',
      comment      : ''
    })
    this.id = createUniqueId()
  }

  getValues() {
    return {
      year         : this.year,
      month        : this.month,
      date         : this.date,
      startTime    : this.startTime,
      endTime      : this.endTime,
      category_a_id: this.category_a_id,
      category_b_id: this.category_b_id,
      category_c_id: this.category_c_id,
      comment      : this.comment
    }
  }

  setValues(data) {
    this.year          = data.year
    this.month         = data.month
    this.date          = data.date
    this.startTime     = data.startTime
    this.endTime       = data.endTime
    this.category_a_id = data.category_a_id
    this.category_b_id = data.category_b_id
    this.category_c_id = data.category_c_id
    this.comment       = data.comment
    return this
  }

  checkConsistencyTime() {
    return compareTime(this.startTime, this.endTime)
  }

  workTime() {
    let t1 = new Date (`1999/01/01 ${this.endTime}`)
    let t2 = new Date (`1999/01/01 ${this.startTime}`)
    return ( t1.getTime() - t2.getTime() ) / 3600000
  }
}