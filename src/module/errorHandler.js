import router from '@/router'
import store from '@/store'
import { Config } from '@/conf/config'

export const apiHandleErr = (error) => {
  store.dispatch('setStackTrace', { stackTrace: error })
  console.error(error)
  router.push(Config.SYSERR_PATH)
}