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
  },
  computed: {
    hasError() { return Object.values(this.errorFlgs).some(errorFlg=>errorFlg) },
  },
}