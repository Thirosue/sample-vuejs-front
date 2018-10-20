import is from 'is_js'
import Toast from '@/components/parts/Toast'
import TimerHelper from '@/module/helper/timerHelper'

export default {
    install: (Vue) => {
      Vue.prototype.$showToast = async (content, info = 'info', position = 'bottom', duration = 2000) => {
        const toast = Vue.extend(Toast)
        const toastBottoms = Array.from(document.querySelectorAll('.toast')).map(node=>node.getBoundingClientRect()).map(rect=>rect.top + rect.height)
        const baseY = is.empty(toastBottoms) ? 0 : Math.max.apply(null, toastBottoms)
        const px = (baseY + 10) + 'px'
        const component = new toast({
          data: {
            info,
            content,
            position,
            px,
          },
        }).$mount()
        document.querySelector("#app").appendChild(component.$el)
        await TimerHelper.sleep(duration)
        component.$el.classList.remove('toast')
        component.$el.classList.add('fadeout')
        await TimerHelper.sleep(1500)
        component.$el.remove()
      }
    }
  }