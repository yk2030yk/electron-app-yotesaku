import DB from './../DB'

export default class Category {
  constructor(tableName) {
    this.data = []
    this.db = new DB(tableName)
    this.load()
  }

  async load() {
    this.data = await this.db.findAll()
  }

  async remove(ids) {
    if (!Array.isArray(ids)) ids = [ids]
    for (let id of ids) {
      await this.db.remove({ _id : id })
    }
    this.load()
  }

  async insert(item) {
    await this.db.insert(item)
    this.load()
  }
}