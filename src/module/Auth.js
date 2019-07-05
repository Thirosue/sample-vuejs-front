import router from '@/router';
import ErrorHandler from '@/module/ErrorHandler';
import { authApi } from '@/module/Api';
import Config from '@/conf/Config';

export default class Auth {
  static handleError(error) {
    if (error.response.status === 401) {
      router.push(Config.SESSION_TIMEOUT_PATH);
    } else {
      ErrorHandler.apiHandleErr(error);
    }
  }

  static async checkSession() {
    await authApi.checkSession().catch(this.handleError);
    console.info('session available!');
  }
}
