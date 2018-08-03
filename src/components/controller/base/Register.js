import handler from '@/module/errorHandler'
import Type from '@/store/mutation-types'
import Message from '@/conf/message'
import Config from '@/conf/config'

export default {
  beforeRouteLeave (to, from, next) {
    //更新完了、エラーの場合は、確認ダイアログスキップ
    if( !this.store.updated && !pathHelper.isErrorPath(to.path) && !this.confirmClean() ){
      return false
    }
    next()
  },
  data: () => {
    return {
    }
  },
  created () {
    document.cookie = Config.FUNCTION_ID + this.screenId
  },
  methods: {
    doValidate() { return false }, //<--- 個別バリデーション
    customizeData(data) {}, //<--- 必要に応じ個別実装
    confirmClean() {
      const result = window.confirm(Message.CLEAR_CONFIRM)
      if (result) {
        this.$store.dispatch(this.namespace + Type.UNSET_ALL)
      } 
      return result
    },
    create() {
      if(this.existsEmptyNode() || !this.doValidate()) return  //Validateはmixinされる前提

      let modifiedData = {}
      const getVaule = (key) => document.querySelector("[data-key='" + key + "']")

      this.columSetting
                .filter(column=>column.type!=='ignore')
                .map(column=>column.key)
                .forEach(key => modifiedData[key] = getVaule(key).value)

      this.customizeData(modifiedData)

      this.$store.dispatch(this.namespace + Type.CREATE, modifiedData )
                    .then(()=>this.$store.dispatch(this.namespace + Type.UPDATED) && this.$router.push(this.store.listPath))
                    .catch(handler.apiHandleErr)
    },
    getType: (type) => type ? type : 'text',
  },
  computed: {
    screenId: () => null, //<--- 個別に定義
    store() { return null }, //<--- 個別に定義
    columSetting() { return null }, //<--- 個別に定義
    namespace() { return this.store.namespace },
    columns() { return _.orderBy(this.columSetting, 'orderBy') },
  },
}