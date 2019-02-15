import is from 'is_js'
import { sleep } from '@/helpers/timerHelper'
import Modal from '@/components/Modal'
import Toast from '@/components/Toast'
import Application from '@/view/base/Application'

export default {
    install: (Vue) => {
      Vue.mixin({
        mixins: [Application]
      })
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
        await sleep(duration)
        component.$el.classList.remove('toast')
        component.$el.classList.add('fadeout')
        await sleep(1500)
        component.$el.remove()
      }

      Vue.prototype.$showModal = (content, title = undefined, submitCallBack = () => {}, cancelCallBack = () => {}) => {
        const modal = Vue.extend(Modal)
        const component = new modal({
          data: {
            title,
            content,
            submitCallBack,
            cancelCallBack,
          },
        }).$mount()
        document.querySelector("#app").appendChild(component.$el)
      }
    }
  }
  