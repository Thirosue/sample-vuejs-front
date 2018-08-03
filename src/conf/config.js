/**
 * 定数定義
 */
export default {
  DEFAULT_ROWS: '10',

  LOGIN_PATH: '/login',
  LOGOUT_PATH: '/logout',
  EDIT_PASSWORD: '/passwordEdit',
  SYSERR_PATH: '/systemError',
  SESSION_TIMEOUT_PATH: '/sessionTimeOut',
  BAD_REQUEST_PATH: '/badRequest',

  COOKIE_ID: 'sid=',
  FUNCTION_ID: 'fid=',

  SEPARATOR: ', ',

  UNAUTHORITHED_PATH: ['login','logout','systemError','sessionTimeOut','badRequest'], //認証不要のパスリスト
  ERROR_PATH: ['systemError','sessionTimeOut','badRequest'] //エラーのパスリスト
}