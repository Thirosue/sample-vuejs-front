import router from '@/router';
import { includeList } from '@/helpers/string';
import ErrorHandler from '@/module/ErrorHandler';
import { Screenlist } from '@/conf/screenList';
import { Config } from '@/conf/config';
import { authApi } from '@/module/Api';

export default class Auth {
  static handleError(error) {
    if (error.response.status === 401) {
      router.push(Config.SESSION_TIMEOUT_PATH);
    } else {
      ErrorHandler.apiHandleErr(error);
    }
  }

  static async checkSession(path) {
    if (!includeList(Config.UNAUTHORITHED_PATH, path)) {
      await authApi.checkSession().catch(this.handleError);
      console.info('session available!');
    }
  }

  static isAllowAction(targetPath, roleList) {
    const targetScreen = Screenlist.find(screen => targetPath.indexOf(screen.url) !== -1);
    if (undefined === targetScreen) {
      return true; // 対象なしは許可
    }
    const allowRole = targetScreen.roles;
    return allowRole.some(role => role === 'all' || roleList.includes(role));
  }
}
