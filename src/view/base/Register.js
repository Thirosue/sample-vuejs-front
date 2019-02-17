import { apiHandleErr } from '@/module/errorHandler';
import Type from '@/store/mutation-types';
import BaseUpdate from '@/view/base/Update';

export default {
  mixins: [BaseUpdate],

  methods: {
    doValidate() { return true }, //<--- 個別バリデーション
    customizeData(data) {}, //<--- 必要に応じ個別実装
    async create() {
      const checkResult = await this.doValidate()
      if(this.existsEmptyNode() || !checkResult || this.hasError) return  //Validateはmixinされる前提

      let modifiedData = {}
      const getVaule = (key) => document.querySelector("[data-key='" + key + "']")

      this.columSetting
                .filter(column=>column.type!=='ignore')
                .map(column=>column.key)
                .forEach(key => modifiedData[key] = getVaule(key).value)

      this.customizeData(modifiedData)

      this.doRegist(modifiedData)
    },
    doRegist(modifiedData) {
      this.$store.dispatch(this.namespace + Type.CREATE, modifiedData )
                    .then(async ()=> {
                      await this.$store.dispatch(this.namespace + Type.UPDATED)
                      this.$router.push(this.store.listPath)
                    })
                    .catch(apiHandleErr)
    },
    getType: (type) => type ? type : 'text',
  },

  computed: {
    type: () => 'update',
    screenId: () => null, //<--- 個別に定義
    store() { return null }, //<--- 個別に定義
    columSetting() { return null }, //<--- 個別に定義
    namespace() { return this.store.namespace },
    columns() { return _.orderBy(this.columSetting, 'orderBy') },
    completePath() { return '/' + this.namespace + 'RegisterComplete' },
  }, 
}