import is from 'is_js'
import download from '@/module/download'
import handler from '@/module/errorHandler'
import Type from '@/store/mutation-types'
import Config from '@/conf/config'
import ListSettings from '@/conf/ListSettings'

export default {
  data: () => {
    return {
    }
  },
  mounted () {
    if(this.store.updated) {
      this.$showModal('更新が完了しました')
    }
    this.$store.dispatch(this.namespace + Type.UNSET_ALL)
    this.restoreCondition()
    if(!is.empty(this.$router.history.current.query)){
      this.doSearch(this.where)
    }
    document.cookie = Config.FUNCTION_ID + this.screenId
  },
  methods: {
    doValidate() {}, //<--- 個別バリデーション
    init() {
      this.$store.dispatch(this.namespace + Type.UNSET_ALL)
      this.doSearch(this.where)
    },
    async doSearch(where) {
      await this.$validator.validateAll()
      await this.doValidate()
      if (this.errors.any()) {
        return
      }

      this.findAll(where)
    },
    findAll(where) {
      let condition = {}
      Object.keys(where)
                .filter(key=>!is.empty(where[key]) && !is.undefined(where[key]) && !is.null(where[key])) //空は検索条件から除外
                .forEach(key => condition[key] = where[key])
      this.$store.dispatch(this.namespace + Type.FIND_ALL, condition)
                  .then(()=>this.$router.push({path: this.$router.history.path, query: condition}))
                  .catch(handler.apiHandleErr)
    },
    search(page, inputRows) {
      const rows = inputRows ? inputRows : this.$router.history.current.query.rows
      const where = Object.assign({}, this.where, {page}, {rows}) //page,rowsをマージ
      this.doSearch(where)
    },
    restoreCondition() {
      const page = this.query.page
      const rows = this.query.rows

      this.where = Object.assign({}, this.convertList())
      this.where = Object.assign({}, this.where, {page}, {rows})
    },
    convertList() {
      let query = this.$router.history.current.query
      let conditions = Object.assign({}, this.where)
      Object.keys(conditions)
              //複数選択項目（チェックボックス、複数選択セレクトボックス）で単一選択の場合、
              .filter(key=>Array.isArray(conditions[key]) && query.hasOwnProperty(key) && !is.empty(query[key]))
              .forEach(key => query[key] = [ query[key] ]) //リストに変換する
      return query;
    },
    downloadList() {
      if (this.results.length > 0) {
        download.createFile(this.fileProperties[0], 'text/plain', this.fileProperties[1], this.results)
      }
    },
  },
  computed: {
    screenId: () => null, //<--- 個別に定義
    fileProperties: () => ['ファイル名記載', 'ファイルヘッダ定義設定'], //<--- 個別に定義
    store() { return null }, //<--- 個別に定義
    columSetting() { return null }, //<--- 個別に定義
    query() { return this.$router.history.current.query },
    namespace() { return this.store.namespace },
    labels() { return ListSettings.getLabels(this.columSetting) },
    resultKeys() { return ListSettings.getKeys(this.columSetting) },
    results() { return this.store.list },
    count() { return this.store.count },
    page() { return this.store.page },
    totalPage() { return this.store.totalPage },
    defaultRows() { return Config.DEFAULT_ROWS },
    searching() { return this.store.searching },
    existsResult() {
      return this.store.list.length !== 0
    },    
    noResult() {
      return this.store.totalPage === 1 && this.store.list.length === 0
    },
    _errors() {
      return this.errors.items.sort((a, b) => a.id - b.id)
    },
  },
}