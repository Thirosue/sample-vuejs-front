import Modal from '@/components/parts/Modal'

export default {
    install: (Vue) => {
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