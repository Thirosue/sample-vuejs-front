import is from 'is_js'
import handler from '@/module/errorHandler'
import Type from '@/store/mutation-types'
import Message from '@/conf/message'
import ViewSettings from '@/conf/ViewSettings'

export default {
  beforeRouteLeave (to, from, next) {
    if( ( this.store.listPath !== to.path || !this.store.updated ) && !this.confirmClean() ){
      return false
    }
    next()
  },
  data: () => {
    return {
      editMode: false,
    };
  },
  mounted() {
    const query = this.$router.history.current.query
    if(!is.empty(query)) {
      console.log(this.$router.history.current.name + ' Update Start target = ' + query.id)
      this.findById(query.id)
    } else {
      console.log('Regist Start')
    }
    this.editMode = Object.keys(query).length > 0
  },
  methods: {
    getScreenId: () => null, //<--- 個別に定義
    doValidate() {}, //<--- 個別バリデーション
    findById(id) {
      this.$store.dispatch(this.namespace + Type.FIND_BY_ID, id)
                  .catch(handler.apiHandleErr)
    },
    results() { 
      let results = []
      Object.keys(this.store.data)
                  .forEach(key => results.push({
                                      key: key, //DecodeはFilterで実施
                                      value: this.store.data[key],
                                      orderBy: ViewSettings.orderBy(key, this.columSetting),
                                      type: ViewSettings.type(key, this.columSetting),
                                    }))
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
      let isOk = await this.$validator.validateAll()
      await this.doValidate()
      if (!isOk && this.errors.any()) {
        alert(this.errors.all())
        return
      }
      let modifiedData = Object.assign({}, this.data)

      //値の詰め替え
      Object.keys(this.store.data)
                    .filter(key => !is.null(document.querySelector("[data-key='" + key + "']")))
                    .forEach(key => modifiedData[key] = document.querySelector("[data-key='" + key + "']").value)

      this.$store.dispatch(this.namespace + this.updateType, modifiedData )
                    .then(()=>this.$store.dispatch(this.namespace + Type.UPDATED) && this.$router.push(this.store.listPath))
                    .catch(handler.apiHandleErr)
    },
  },
  computed: {
    store() { return null }, //<--- 個別に定義
    columSetting() { return null }, //<--- 個別に定義
    namespace() { return this.store.namespace },
    data() { return this.store.data },
    _errors () {
      return this.errors.items.sort((a,b) => a.id - b.id)
    },
    buttonLabel() {
      return this.editMode ? '変更' : '登録'
    },
    updateType() {
      return this.data.version ? Type.UPDATE : Type.CREATE
    },
  },
}