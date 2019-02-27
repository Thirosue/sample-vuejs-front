/**
 * 詳細画面表示設定
 */
const Staff = [
  {
    key: 'id', label: 'ID', orderBy: 1, ignore: true,
  },
  {
    key: 'lastName', label: '苗字', required: true, max: 40, orderBy: 2,
  },
  {
    key: 'firstName', label: '名前', required: true, max: 40, orderBy: 3,
  },
  {
    key: 'email', label: 'Email', required: true, max: 100, type: 'email', orderBy: 4,
  },
  {
    key: 'tel', label: 'Tel', numeric: true, max: 20, orderBy: 5,
  },
  {
    key: 'password', label: 'パスワード', orderBy: 6, ignore: true,
  },
  {
    key: 'version', label: '改訂番号', orderBy: 0, ignore: true,
  },
];

export default {
  Staff,
};
