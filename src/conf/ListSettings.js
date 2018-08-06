/**
 * 一覧画面表示設定
 */
import _ from 'lodash'

const Staff = [
  {key: 'id', value: 'ID', order: 1},
  {key: 'firstName', value: '名前', order: 2},
  {key: 'lastName', value: '苗字', order: 3},
  {key: 'email', value: 'Email', order: 4},
  {key: 'tel', value: 'Tel', order: 5},
]

const getLabels = mapping => _.orderBy(mapping, 'order').map(row=>row.value)
const getKeys = mapping => _.orderBy(mapping, 'order').map(row=>row.key)

export default {
  getLabels,
  getKeys,
  Staff,
}
