/*
 * 画面一覧
 *
 * 許可リスト方式
 * 全てのロールに許可する画面は "all" を指定
*/
import { Config } from '@/conf/config';

export const Screenlist = [
  {
    id: 'LOGIN', name: 'ログイン', url: '/login', roles: [Config.ALLOW_ALL],
  },
  //    { id: "TOP" , name: "ポータルトップ" , url: "/" , roles: ["all"] },
  {
    id: 'EDIT_PASSWORD', name: 'パスワード編集', url: '/passwordEdit', roles: [Config.ALLOW_ALL],
  },
  {
    id: 'STAFF_LIST', name: '担当者一覧', url: '/staffList', roles: [Config.ADMIN],
  },
  {
    id: 'STAFF_DETAIL', name: '担当者詳細', url: '/staff/', roles: [Config.ADMIN],
  },
  {
    id: 'STAFF_EDIT', name: '担当者編集', url: '/staffEdit', roles: [Config.ADMIN],
  },
  {
    id: 'STAFF_REGISTER', name: '担当者登録', url: '/staffRegister', roles: [Config.ADMIN],
  },
  {
    id: 'CODE_LIST', name: 'コード一覧', url: '/codeList', roles: [Config.ADMIN, Config.OPERATOR],
  },
  {
    id: 'CODE_DETAIL', name: 'コード詳細', url: '/code/', roles: [Config.ADMIN, Config.OPERATOR],
  },
  {
    id: 'CODE_EDIT', name: 'コード編集', url: '/codeEdit', roles: [Config.ADMIN, Config.OPERATOR],
  },
  {
    id: 'CODE_REGISTER', name: 'コード登録', url: '/codeRegister', roles: [Config.ADMIN, Config.OPERATOR],
  },
];
