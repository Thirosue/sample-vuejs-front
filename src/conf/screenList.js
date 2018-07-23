/*
 * 画面一覧
 * 
 * 許可リスト方式
 * 全てのロールに許可する画面は "all" を指定
*/
export default [
    { "id" : "LOGIN" , "name" : "ログイン" , "url" : "/login" , "all" : true },
//    { "id" : "TOP" , "name" : "ポータルトップ" , "url" : "/" , "all" : true },
    { "id" : "STAFF_LIST" , "name" : "担当者一覧" , "url" : "/staffList" , "all" : true },
    { "id" : "STAFF_EDIT" , "name" : "担当者編集" , "url" : "/staffEdit" , "all" : true },
    { "id" : "STAFF_DETAIL" , "name" : "担当者詳細" , "url" : "/staff/" , "admin" : true },
]