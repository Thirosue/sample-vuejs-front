import store from '@/store'
import router from '@/router'
import Config from '@/conf/config'
import Application from '@/components/controller/base/Application'

export default {
    install: (Vue) => {
      Vue.mixin({
        mixins: [Application]
      })
      Vue.prototype.$logout = () => {
        store.dispatch('session/logout')
                      .finally(()=>router.push(Config.LOGIN_PATH))
      }
    }
  }
  