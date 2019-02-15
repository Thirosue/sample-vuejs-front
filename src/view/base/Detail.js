import _ from 'lodash'
import { apiHandleErr } from '@/module/errorHandler'
import Type from '@/store/mutation-types'
import ViewSettings from '@/conf/ViewSettings'
import { Config } from '@/conf/config'

export default {
  data: () => {
    return {
    }
  },
  created () {
    document.cookie = Config.FUNCTION_ID + this.screenId
  },
  mounted() {
    this.findById(this.$route.params.id)
  },
  methods: {
    findById(id) {
      this.$store.dispatch(this.namespace + Type.FIND_BY_ID, id)
                  .catch(apiHandleErr)
    },
    results() { 
      const results = Object.keys(this.store.data)
                              .map(key => ViewSettings.createFeedWithDecode(key, this.store.data, this.columSetting))
      return _.orderBy(results, 'orderBy')
    },
  },
  computed: {
    screenId: () => null, //<--- 個別に定義
    store() { return null }, //<--- 個別に定義
    columSetting() { return null }, //<--- 個別に定義
    namespace() { return this.store.namespace },
    data() { return this.store.data },
  },
}