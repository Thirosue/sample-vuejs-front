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
    checkError() { 
      const inputCnt = document.querySelectorAll('.sample-detail-area input').length
      return Object.values(this.errorFlgs).length !== inputCnt || Object.values(this.errorFlgs).some(errorFlg=>errorFlg) 
    },
  },
  computed: {
    hasError() { return Object.values(this.errorFlgs).some(errorFlg=>errorFlg) },
  },
}