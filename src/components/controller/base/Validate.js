import is from 'is_js'

export default {
  data: () => {
    return {
      errorFlgs: {},
    }
  },
  methods: {
    setError(key, event) {
      this.errorFlgs[key] = event
      this.errorFlgs = Object.assign({}, this.errorFlgs)
    },
    existsEmptyNode() { 
      const requiredNodeList = Array.from(document.querySelectorAll(':required'))
      return requiredNodeList.some(node=>is.empty(node.value))
    },
  },
  computed: {
    hasError() { return Object.values(this.errorFlgs).some(errorFlg=>errorFlg) },
  },
}