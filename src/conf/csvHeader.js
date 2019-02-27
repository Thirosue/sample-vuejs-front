// 担当者一覧
const STAFF_LIST = [
  { key: 'id', value: '担当者ID' },
  { key: 'firstName', value: '名前' },
  { key: 'lastName', value: '苗字' },
  { key: 'email', value: 'email' },
  { key: 'tel', value: 'Tel' },
];

const CODE_LIST = [
  { key: 'id', value: 'コードID' },
  { key: 'categoryKey', value: 'コード分類キー' },
  { key: 'categoryName', value: 'コード分類名' },
  { key: 'codeKey', value: 'コードキー' },
  { key: 'codeValue', value: 'コード値' },
  { key: 'codeAlias', value: 'コードエイリアス' },
  { key: 'displayOrder', value: '表示順' },
  { key: 'isInvalid', value: '無効フラグ' },
];

export default {
  STAFF_LIST,
  CODE_LIST,
};
