import Application from '@/components/controller/base/Application'

export default {
    install: (Vue) => {
      Vue.mixin({
        mixins: [Application]
      })
    }
  }
  