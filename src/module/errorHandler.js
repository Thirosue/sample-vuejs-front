import router from '@/router';
import store, { MUTATION_TYPES } from '@/store';
import Config from '@/conf/Config';

export default class ErrorHandler {
  static apiHandleErr(error) {
    store.commit(MUTATION_TYPES.SET_STACKTRACE, error);
    console.error(error);
    router.push(Config.SYSERR_PATH);
  }
}
