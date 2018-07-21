import router from '@/router'
import store from '@/store'
import Config from '@/conf/config'

const apiHandleErr = (stackTrace) => {
  store.dispach('setStackTrace', stackTrace)
  console.error(stackTrace)
  router.push(Config.SYSERR_PATH)
}

export default {
  apiHandleErr,
}
