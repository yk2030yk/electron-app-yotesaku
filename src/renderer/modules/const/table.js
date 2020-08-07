import electron from 'electron'
import path from 'path'
const remoteAppPath = (electron.app || electron.remote.app).getPath('userData');
export const schedule_of_date_table = path.join(remoteAppPath, `/db/schedule_of_date.db`)
export const category_a_table       = path.join(remoteAppPath, `/db/category_a_table.db`)
export const category_b_table       = path.join(remoteAppPath, `/db/category_b_table.db`)
export const category_c_table       = path.join(remoteAppPath, `/db/category_c_table.db`)