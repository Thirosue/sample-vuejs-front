import is from 'is_js'
import handler from '@/module/errorHandler'
import Type from '@/store/mutation-types'
import Message from '@/conf/message'
import ViewSettings from '@/conf/ViewSettings'
import Config from '@/conf/config'

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
    getScreenId: () => null, //<--- 個別に定義
    doValidate() {}, //<--- 個別バリデーション
    findById(id) {
      this.$store.dispatch(this.namespace + Type.FIND_BY_ID, id)
                  .catch(handler.apiHandleErr)
    },
    results() { 
      const results = Object.keys(this.store.data)
                              .map(key => ViewSettings.createFeed(key, this.store.data, this.columSetting))  //DecodeはFilterで実施
      return _.orderBy(results, 'orderBy')
    },
    confirmClean: function () {
      const result = window.confirm(Message.CLEAR_CONFIRM)
      if (result) {
        this.$store.dispatch(this.namespace + Type.UNSET_ALL)
      } 
      return result
    },
    async update() {
      let modifiedData = Object.assign({}, this.data)
      const getVaule = (key) => document.querySelector("[data-key='" + key + "']")

      //値の詰め替え
      Object.keys(this.store.data)
                    .filter(key => !is.null(getVaule(key)))
                    .forEach(key => modifiedData[key] = getVaule(key).value)

      this.$store.dispatch(this.namespace + Type.UPDATE, modifiedData )
                    .then(()=>this.$store.dispatch(this.namespace + Type.UPDATED) && this.$router.push(this.store.listPath))
                    .catch(handler.apiHandleErr)
    },
    getType: (type) => type ? type : 'text',
  },
  computed: {
    store() { return null }, //<--- 個別に定義
    columSetting() { return null }, //<--- 個別に定義
    namespace() { return this.store.namespace },
    data() { return this.store.data },
  },
}