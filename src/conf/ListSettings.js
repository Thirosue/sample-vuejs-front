/**
 * 一覧画面表示設定
 */
import _ from 'lodash'

const Staff = [
  {key: 'id', value: 'ID', order: 1, sort: false},
  {key: 'firstName', value: '名前', order: 2, sort: true},
  {key: 'lastName', value: '苗字', order: 3, sort: false},
  {key: 'email', value: 'Email', order: 4, sort: true},
  {key: 'tel', value: 'Tel', order: 5, sort: false},
]

const getLabels = mapping => _.orderBy(mapping, 'order').map(row=>row.value)
const getKeys = mapping => _.orderBy(mapping, 'order').map(row=>row.key)
const getSortList = mapping => {
  const ascList = mapping.filter(row=>row.sort).map(row=>{
    const key = [row.key, 'asc'].join(' ')
    const value = [row.value, '昇順'].join(' ')
    const order = row.order + 0.1
    return {key, value, order}
  })
  const descList = mapping.filter(row=>row.sort).map(row=>{
    const key = [row.key, 'desc'].join(' ')
    const value = [row.value, '降順'].join(' ')
    const order = row.order + 0.2
    return {key, value, order}
  })
  return _.orderBy(_.concat(ascList, descList), 'order')
} 

export default {
  getLabels,
  getKeys,
  getSortList,
  Staff,
}
