/**
 * 画面表示設定
 */
const Staff = [
  {key: 'id', value: 'ID', orderBy: 1, type: 'ignore'},
  {key: 'firstName', value: '名前', orderBy: 2},
  {key: 'lastName', value: '苗字', orderBy: 3},
  {key: 'email', value: 'Email', orderBy: 4},
  {key: 'tel', value: 'Tel', orderBy: 5},
  {key: 'password', value: 'パスワード', orderBy: 6, type: 'sercret'},
  {key: 'version', value: '改訂番号', orderBy: 0, type: 'ignore'},
]

const find = (key, mapping) => mapping.find(list=>list.key === key)
const decode = (key, mapping) => find(key, mapping).value

const createFeed = (key, results, mapping) => ({
  key: key,
  value: results[key],
  orderBy: find(key, mapping).orderBy,
  type: find(key, mapping).type,
})

const createFeedWithDecode = (key, results, mapping) => ({
  key: find(key, mapping).value,
  value: results[key],
  orderBy: find(key, mapping).orderBy,
  type: find(key, mapping).type,
})

export default {
  decode,
  createFeed,
  createFeedWithDecode,
  Staff,
}
