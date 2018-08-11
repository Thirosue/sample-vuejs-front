import is from 'is_js'
import handler from '@/module/errorHandler'
import Type from '@/store/mutation-types'
import Message from '@/conf/message'
import ViewSettings from '@/conf/ViewSettings'
import Config from '@/conf/config'
import pathHelper from '@/module/helper/pathHelper'

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
  mounted() {
    const query = this.$router.history.current.query
    if(!is.empty(query)) {
      console.log(this.$router.history.current.name + ' Update Start target = ' + query.id)
      this.findById(query.id)
    } else {
      this.$router.push(Config.BAD_REQUEST_PATH)
    }
  },
  methods: {
    doValidate() { return true }, //<--- 個別バリデーション
    customizeData(data) {}, //<--- 必要に応じ個別実装
    findById(id) {
      this.$store.dispatch(this.namespace + Type.FIND_BY_ID, id)
                  .catch(handler.apiHandleErr)
    },
    results() { 
      const results = Object.keys(this.store.data)
                              .map(key => ViewSettings.createFeed(key, this.store.data, this.columSetting))  //DecodeはFilterで実施
      return _.orderBy(results, 'orderBy')
    },
    confirmClean() {
      const result = window.confirm(Message.CLEAR_CONFIRM)
      if (result) {
        this.$store.dispatch(this.namespace + Type.UNSET_ALL)
      } 
      return result
    },
    async update() {
      const checkResult = await this.doValidate()
      if(this.existsEmptyNode() || !checkResult || this.hasError) return  //Validateはmixinされる前提

      let modifiedData = Object.assign({}, this.data)
      const getVaule = (key) => document.querySelector("[data-key='" + key + "']")

      //値の詰め替え
      Object.keys(this.store.data)
                    .filter(key => !is.null(getVaule(key)))
                    .forEach(key => modifiedData[key] = getVaule(key).value)

      this.customizeData(modifiedData)
      this.doUpdate(modifiedData)
    },
    doUpdate(modifiedData) {
      this.$store.dispatch(this.namespace + Type.UPDATE, modifiedData )
                    .then(async ()=> {
                      await this.$store.dispatch(this.namespace + Type.UPDATED)
                      this.$router.push(this.store.listPath)
                    })
                    .catch(handler.apiHandleErr)
    },
    getType: (type) => type ? type : 'text',
  },
  computed: {
    screenId: () => null, //<--- 個別に定義
    store() { return null }, //<--- 個別に定義
    columSetting() { return null }, //<--- 個別に定義
    namespace() { return this.store.namespace },
    data() { return this.store.data },
    posting() { return this.store.posting },
  },
}