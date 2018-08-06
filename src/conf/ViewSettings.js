/**
 * 詳細画面表示設定
 */
const Staff = [
  {key: 'id', value: 'ID', orderBy: 1, type: 'ignore'},
  {key: 'firstName', value: '名前', required: true, max: 40, orderBy: 2},
  {key: 'lastName', value: '苗字', required: true, max: 40, orderBy: 3},
  {key: 'email', value: 'Email', required: true, max: 100, type:'email', orderBy: 4},
  {key: 'tel', value: 'Tel', numeric: true, max: 20, orderBy: 5},
  {key: 'password', value: 'パスワード', orderBy: 6, type: 'ignore'},
  {key: 'version', value: '改訂番号', orderBy: 0, type: 'ignore'},
]

const find = (key, mapping) => mapping.find(list=>list.key === key)
const decode = (key, mapping) => find(key, mapping).value

const createFeed = (key, results, mapping) => ({
  key: key,
  value: results[key],
  type: find(key, mapping).type,
  min: find(key, mapping).min,
  max: find(key, mapping).max,
  required: find(key, mapping).required,
  numeric: find(key, mapping).numeric,
  orderBy: find(key, mapping).orderBy,
})

const createFeedWithDecode = (key, results, mapping) => {
  let feed = createFeed(key, results, mapping)
  feed[key] = find(key, mapping).value
  return feed
}

export default {
  decode,
  createFeed,
  createFeedWithDecode,
  Staff,
}
