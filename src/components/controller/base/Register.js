import is from 'is_js'
import handler from '@/module/errorHandler'
import Type from '@/store/mutation-types'
import Message from '@/conf/message'

export default {
  beforeRouteLeave (to, from, next) {
    if( !this.store.updated && !this.confirmClean() ){
      return false
    }
    next()
  },
  data: () => {
    return {
    }
  },
  methods: {
    getScreenId: () => null, //<--- 個別に定義
    doValidate() {}, //<--- 個別バリデーション
    confirmClean: function () {
      const result = window.confirm(Message.CLEAR_CONFIRM)
      if (result) {
        this.$store.dispatch(this.namespace + Type.UNSET_ALL)
      } 
      return result
    },
    async create() {
      let modifiedData = {}
      const getVaule = (key) => document.querySelector("[data-key='" + key + "']")

      this.columSetting
                .filter(column=>column.type!=='ignore')
                .map(column=>column.key)
                .forEach(key => modifiedData[key] = getVaule(key).value)

      this.$store.dispatch(this.namespace + Type.CREATE, modifiedData )
                    .then(()=>this.$store.dispatch(this.namespace + Type.UPDATED) && this.$router.push(this.store.listPath))
                    .catch(handler.apiHandleErr)
    },
    getType: (type) => type ? type : 'text',
  },
  computed: {
    store() { return null }, //<--- 個別に定義
    columSetting() { return null }, //<--- 個別に定義
    namespace() { return this.store.namespace },
    columns() { return _.orderBy(this.columSetting, 'orderBy') },
  },
}