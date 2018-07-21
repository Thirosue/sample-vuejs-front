/**
 * 画面表示設定
 */
const Staff = [
  {key: 'id', value: 'ID', orderBy: 1, type: 'label'},
  {key: 'firstName', value: '名前', orderBy: 2},
  {key: 'lastName', value: '苗字', orderBy: 3},
  {key: 'email', value: 'Email', orderBy: 4},
  {key: 'tel', value: 'Tel', orderBy: 5},
  {key: 'password', value: 'パスワード', orderBy: 6, type: 'sercret'},
  {key: 'version', value: '改訂番号', orderBy: 0, type: 'ignore'},
]

const decode = (key, mapping) => mapping.find(list=>list.key === key).value
const orderBy = (key, mapping) => mapping.find(list=>list.key === key).orderBy
const type = (key, mapping) => mapping.find(list=>list.key === key).type

export default {
  decode,
  orderBy,
  type,
  Staff,
}
