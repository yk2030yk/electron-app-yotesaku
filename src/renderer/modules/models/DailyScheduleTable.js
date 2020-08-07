import { schedule_of_date_table } from './../const/table'
import DB from './../DB'

class DailyScheduleTable {
  constructor() {
    this.db = new DB(schedule_of_date_table)
  }

  async insert(data) {
    return await this.db.insert(data)
  }

  async update(where, data) {
    return await this.db.update(where, data)
  }

  async find(where) {
    return await this.db.find(where)
  }

  async remove(where) {
    return await this.db.remove(where)
  }
}

export default new DailyScheduleTable()