import Category from './Category'
import { category_b_table } from './../const/table'

class CategoryB extends Category {
  constructor() {
    super(category_b_table)
  }
}

export default new CategoryB()