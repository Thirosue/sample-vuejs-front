/*
 * メニュー一覧
 *
 * 許可リスト方式
 * 全てのロールに許可する画面は "all" を指定
*/
import Config from '@/conf/Config';

export default [
  {
    category: 'STAFF', order: 1, id: 'STAFF_LIST', name: '担当者一覧', url: '/staffList', roles: [Config.ADMIN],
  },
  {
    category: 'STAFF', order: 2, id: 'STAFF_REGISTER', name: '担当者登録', url: '/staffRegister', roles: [Config.ADMIN],
  },
  {
    category: 'CODE', order: 1, id: 'CODE_LIST', name: 'コード一覧', url: '/codeList', roles: [Config.ADMIN, Config.OPERATOR],
  },
  {
    category: 'CODE', order: 2, id: 'CODE_REGISTER', name: 'コード登録', url: '/codeRegister', roles: [Config.ADMIN, Config.OPERATOR],
  },
  {
    category: 'INQUIRY', order: 1, id: 'INQUIRY_LIST', name: '問い合わせ一覧', url: '/inquiryList', roles: [Config.ADMIN],
  },
  {
    category: 'INQUIRY', order: 2, id: 'INQUIRY_LIST2', name: '問い合わせ一覧２', url: '/inquiryList2', roles: [Config.ADMIN],
  },
];
