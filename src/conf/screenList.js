/*
 * 画面一覧
 * 
 * 許可リスト方式
 * 全てのロールに許可する画面は "all" を指定
*/

export default [
    { "id" : "LOGIN" , "name" : "ログイン" , "url" : "/login", "roles" : ["all"] },
//    { "id" : "TOP" , "name" : "ポータルトップ" , "url" : "/" , "roles" : ["all"] },
    { "id" : "EDIT_PASSWORD" , "name" : "パスワード編集" , "url" : "/passwordEdit", "roles" : ["all"] },
    { "id" : "STAFF_LIST" , "name" : "担当者一覧" , "url" : "/staffList", "roles" : ["system_admin"] },    
    { "id" : "STAFF_DETAIL" , "name" : "担当者詳細" , "url" : "/staff/" , "roles" : ["system_admin"] },
    { "id" : "STAFF_EDIT" , "name" : "担当者編集" , "url" : "/staffEdit" , "roles" : ["system_admin"] },
    { "id" : "STAFF_REGISTER" , "name" : "担当者登録" , "url" : "/staffRegister" , "roles" : ["none"] },
]