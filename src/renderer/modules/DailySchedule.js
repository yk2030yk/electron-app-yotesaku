import ScheduleItem from './ScheduleItem'
import DailyScheduleTable from './models/DailyScheduleTable'
import CategoryA from './models/CategoryA'
import { isUndefined } from './util/util'

export default class DailySchedule {
  constructor(year, month, date) {
    this.year  = year
    this.month = month
    this.date  = date
    this.workTime = null
    this.schedule = []
    this.id = null
    this.load()
  }

  getItems() {
    return this.schedule
  }

  getItem(index) {
    return this.schedule[index]
  }
  
  getSize() {
    return this.schedule.length
  }

  pushItem(item) {
    this.schedule.push(item)
  }

  pushNewItem(index) {
    const newItem = new ScheduleItem(this.year, this.month, this.date);
    if (isUndefined(index)) {
      this.pushItem(newItem)
    } else {
      const before = this.getItem(index)
      newItem.startTime = before.startTime
      newItem.endTime   = before.startTime
      this.schedule.splice(index, 0, newItem)
    }
    this.adjustTime()
  }

  deleteItem(index) {
    const deleted = this.schedule.filter(
      (d, i) => { return i != index }
    )
    this.schedule = deleted
    this.adjustTime()
  }

  async save() {
    const data = this.getSaveData()
    if (!this.id) {
      const result = await DailyScheduleTable.insert(data)
      if (result) this.id = result._id
    } else {
      await DailyScheduleTable.update({ _id : this.id }, data)
    }
  }

  async load(path) {
    const result = await DailyScheduleTable.find({
      year:  this.year,
      month: this.month,
      date:  this.date,
      isTemplate: false,
    }).catch(err =>  console.log(err))

    if (result.length > 0) {
      const data = result[0]
      this.schedule = data.schedule.map(
        data => (new ScheduleItem()).setValues(data)
      )
      this.id = data._id
    }
  }

  async saveAsTemplete() {
    const data = this.getSaveData()
    data.isTemplate = true
    await DailyScheduleTable.remove({ isTemplate: true })
    const result = await DailyScheduleTable.insert(data)
  }

  async loadTemplete() {
    const result = await DailyScheduleTable.find({
      isTemplate: true
    }).catch(err => console.log(err))

    if (result.length > 0) {
      const data = result[0]
      data.year  = this.year
      data.month = this.month
      data.date  = this.date
      this.schedule = data.schedule.map(
        data => (new ScheduleItem()).setValues(data)
      )
    }
  }

  getSaveData() {
    return {
      year:  this.year,
      month: this.month,
      date:  this.date,
      schedule: this.schedule.map(s => s.getValues()),
      isTemplate: false
    }
  }

  adjustTime() {
    this.schedule.reduce((acc, cur) => {
      acc.endTime = cur.startTime
      return cur
    })
    const last = this.schedule[this.schedule.length - 1]
    last.endTime = last.startTime
  }

  hasTimeAdjustmentError() {
    const err = this.schedule.filter(s => !s.checkConsistencyTime())
    return err.length > 0
  }

  clacWorkTimes() {
    const zatsumuIds = CategoryA.zatsumuIds;
    let sum = { project:0, zatsumu: 0 }
    for (let item of this.schedule) {
      if (zatsumuIds.indexOf(item.categpru_a_id) > -1) {
        sum.zatsumu += item.workTime()
      } else {
        sum.project += item.workTime()
      }
    }
    
    if (isNaN(sum.project)) sum.project = 0
    if (isNaN(sum.zatsumu)) sum.zatsumu = 0
    sum.total = sum.project + sum.zatsumu

    return sum
  }

  totalWorkTime() {
    return this.clacWorkTimes().total
  }

  projectWorkTime() {
    return this.clacWorkTimes().project
  }

  zatsumuWorkTime() {
    return this.clacWorkTimes().zatsumu
  }
}