import Category from './Category'
import { category_a_table } from './../const/table'

class CategoryA extends Category {
  constructor() {
    super(category_a_table)
    this.zatsumuIds = []
  }

  async load() {
    super.load()
    this.zatsumuIds = this.data.filter(d => d.isZatsumu).map(d => d._id)
  }
}

export default new CategoryA()