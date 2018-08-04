import Toast from '@/components/parts/Toast'

export default {
    install: (Vue) => {
      Vue.prototype.$showToast = (content, info = 'info', position = 'bottom', duration = 2000) => {
        const toast = Vue.extend(Toast)
        const component = new toast({
          data: {
            info,
            content,
            position,
          },
        }).$mount()
        document.querySelector("#app").appendChild(component.$el)
        setTimeout(() => {
          component.$el.remove()
        }, duration)
      }
    }
  }