import Category from './Category'
import { category_c_table } from './../const/table'

class CategoryC extends Category {
  constructor() {
    super(category_c_table)
  }
}

export default new CategoryC()