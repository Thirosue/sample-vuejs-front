import is from 'is_js'
import { createFile } from '@/module/download'
import { apiHandleErr } from '@/module/errorHandler'
import Type from '@/store/mutation-types'
import { Config } from '@/conf/config'

export default {
  data: () => {
    return {
    }
  },
  beforeRouteUpdate (to, from, next) {
    if(!is.empty(to.query)) {
      this.restoreCondition(to.query)
      this.findAll(to.query)
    } else {
      location.reload() //resultsがクリアされない
    }
    next()
  },
  mounted () {
    if(this.store.updated) {
      this.$showModal('更新が完了しました')
    }
    this.$store.dispatch(this.namespace + Type.UNSET_ALL)
    if(!is.empty(this.$router.history.current.query)) {
      this.restoreCondition(this.$router.history.current.query)
      this.findAll(this.where)
    }
    document.cookie = Config.FUNCTION_ID + this.screenId
  },
  methods: {
    doValidate() {}, //<--- 個別バリデーション
    async init() {
      await this.$validator.validateAll()
      await this.doValidate()
      if (this.errors.any()) {
        return
      }

      this.where.page = 1
      this.changeState(this.where)
    },
    findAll(where) {
      this.$store.dispatch(this.namespace + Type.FIND_ALL, this.getExistsValue(where))
                  .catch(apiHandleErr)
    },
    search(page, inputRows) {
      const rows = inputRows ? inputRows : this.$router.history.current.query.rows
      this.changeState(Object.assign({}, this.where, {page}, {rows})) //page,rowsをマージ
    },
    changeState(where) {
      this.$router.push({path: this.$router.history.path, query: this.getExistsValue(where)})
    },
    restoreCondition(where) {
      this.where = Object.assign({}, this.convertList(where))
    },
    convertList(query) {
      const conditions = Object.assign({}, this.where)
      Object.keys(conditions)	
              //複数選択項目（チェックボックス、複数選択セレクトボックス）で単一選択の場合、	
              .filter(key=>Array.isArray(conditions[key]) && query.hasOwnProperty(key) && !is.empty(query[key]))	
              .forEach(key => query[key] = [ query[key] ]) //リストに変換する	
      return query
    },
    getExistsValue(where) {
      let condition = {}
      Object.keys(where)
                .filter(key=>!is.empty(where[key]) && !is.undefined(where[key]) && !is.null(where[key])) //空は検索条件から除外
                .forEach(key => condition[key] = where[key])
      return condition
    },
    downloadList() {
      if (this.results.length > 0) {
        createFile(this.fileProperties[0], 'text/plain', this.fileProperties[1], this.results)
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
    labels() { return _.orderBy(this.columSetting, 'order').map(row=>row.value) },
    resultKeys() { return _.orderBy(this.columSetting, 'order').map(row=>row.key) },
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