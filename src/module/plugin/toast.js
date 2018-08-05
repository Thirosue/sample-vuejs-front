import Toast from '@/components/parts/Toast'
import TimerHelper from '@/module/helper/timerHelper'

export default {
    install: (Vue) => {
      Vue.prototype.$showToast = async (content, info = 'info', position = 'bottom', duration = 2000) => {
        const toast = Vue.extend(Toast)
        const component = new toast({
          data: {
            info,
            content,
            position,
          },
        }).$mount()
        document.querySelector("#app").appendChild(component.$el)
        await TimerHelper.sleep(duration)
        component.$el.classList.add('fadeout')
        await TimerHelper.sleep(1500)
        component.$el.remove()
      }
    }
  }