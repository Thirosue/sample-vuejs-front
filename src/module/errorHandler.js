import router from '@/router';
import store from '@/store';
import { Config } from '@/conf/config';

export default class ErrorHandler {
  static apiHandleErr(error) {
    store.commit('setStackTrace', { stackTrace: error });
    console.error(error);
    router.push(Config.SYSERR_PATH);
  }
}
