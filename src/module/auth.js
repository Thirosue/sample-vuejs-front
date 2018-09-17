import router from '@/router'
import store from '@/store'
import handler from '@/module/errorHandler'
import Screenlist from '@/conf/screenList'
import Config from '@/conf/config'
import pathHelper from '@/module/helper/pathHelper'

const checkSession = (path) => {
  if(!pathHelper.isUnAuthorizePath(path)) {
    store.dispatch('session/checkSession')
                .then(() => console.info('session available!'))
                .catch(error => {
                  if(error.status===401) {
                    router.push(Config.SESSION_TIMEOUT_PATH)
                  } else {
                    handler.apiHandleErr(error)
                  }
                })
  }
}

const isAllowAction = (targetPath, roleList) => {
  const targetScreen = Screenlist.find(screen=>targetPath.indexOf(screen.url)!==-1)
  if(undefined === targetScreen) {
    return true //対象なしは許可
  }
  const allowRole = targetScreen["roles"]
  return allowRole.some(role => role === "all" || roleList.includes(role))
}

export default {
  checkSession,
  isAllowAction,
}