import Database from 'nedb';

export default class DB {
  constructor(table) {
    this.db = new Database({
      filename: table
    });
    console.log(' load ' + table)
    this.db.loadDatabase((error) => {
      if (error !== null) {
        console.log(error)
      }
    });
  }

  insert(data) {
    return new Promise((resolve, reject) => {
      this.db.insert(data, (err, newDocs) => {
        if (err) {
          reject(false)
        } else{
          resolve(newDocs)
        }
      })
    })
  }

  update(where = {}, data) {
    return new Promise((resolve, reject) => {
      this.db.update(where, data, (err, num) => {
        if (err) {
          reject(0)
        } else{
          resolve(num)
        }
      })
    })
  }

  removeOne(where = {}) {
    return new Promise((resolve, reject) => {
      this.db.remove(where, {}, (err, num) => {
        if (err) {
          reject(0)
        } else{
          resolve(num)
        }
      })
    })
  }

  remove(where = {}) {
    return new Promise((resolve, reject) => {
      this.db.remove(where, { multi: true }, (err, num) => {
        if (err) {
          reject(0)
        } else{
          resolve(num)
        }
      })
    })
  }

  find(where = {}) {
    return new Promise((resolve, reject) => {
      this.db.find(where, (err, docs) => {
        if (err) {
          reject(false)
        } else{
          resolve(docs)
        }
      })
    })
  }

  findAll() {
    return new Promise((resolve, reject) => {
      this.db.find({}, (err, docs) => {
        if (err) {
          reject(false)
        } else {
          resolve(docs)
        }
      })
    })
  }
}