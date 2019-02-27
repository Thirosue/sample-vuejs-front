import router from '@/router';
import { includeList } from '@/helpers/string';
import { apiHandleErr } from '@/module/errorHandler';
import { Screenlist } from '@/conf/screenList';
import { Config } from '@/conf/config';
import { authApi } from '@/module/api';

const _handleError = (error) => {
  if (error.response.status === 401) {
    router.push(Config.SESSION_TIMEOUT_PATH);
  } else {
    apiHandleErr(error);
  }
};

export const checkSession = async (path) => {
  if (!includeList(Config.UNAUTHORITHED_PATH, path)) {
    await authApi.checkSession().catch(_handleError);
    console.info('session available!');
  }
};

export const isAllowAction = (targetPath, roleList) => {
  const targetScreen = Screenlist.find(screen => targetPath.indexOf(screen.url) !== -1);
  if (undefined === targetScreen) {
    return true; // 対象なしは許可
  }
  const allowRole = targetScreen.roles;
  return allowRole.some(role => role === 'all' || roleList.includes(role));
};
