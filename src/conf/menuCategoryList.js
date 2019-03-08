/*
 * メニューカテゴリ一覧
 *
 * 許可リスト方式
 * 全てのロールに許可する画面は "all" を指定
*/
import Config from '@/conf/Config';

export default [
  {
    category: 'STAFF', order: 1, name: '担当者管理', roles: [Config.ADMIN],
  },
  {
    category: 'CODE', order: 2, name: 'コード管理', roles: [Config.ADMIN, Config.OPERATOR],
  },
  {
    category: 'INQUIRY', order: 3, name: '問い合わせ管理', roles: [Config.ADMIN],
  },
];
