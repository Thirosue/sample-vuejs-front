import _ from 'lodash'
import handler from '@/module/errorHandler'
import Type from '@/store/mutation-types'
import ViewSettings from '@/conf/ViewSettings'

export default {
  data: () => {
    return {
    }
  },
  mounted() {
    this.findById(this.$route.params.id)
  },
  methods: {
    getScreenId: () => null, //<--- 個別に定義
    findById(id) {
      this.$store.dispatch(this.namespace + Type.FIND_BY_ID, id)
                  .catch(handler.apiHandleErr)
    },
    results() { 
      const results = Object.keys(this.store.data)
                              .map(key => ViewSettings.createFeedWithDecode(key, this.store.data, this.columSetting))
      return _.orderBy(results, 'orderBy')
    },
  },
  computed: {
    store() { return null }, //<--- 個別に定義
    columSetting() { return null }, //<--- 個別に定義
    namespace() { return this.store.namespace },
    data() { return this.store.data },
  },
}