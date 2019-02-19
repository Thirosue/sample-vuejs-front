import is from 'is_js';
import { apiHandleErr } from '@/module/errorHandler';
import { Config } from '@/conf/config';
import BaseUpdate from '@/view/base/Update';
import { FORM_GETTER_TYPES, FORM_MUTATION_TYPES } from '@/store/modules/form';
import { PATH_LIST } from '@/helpers/path';

export default {
  mixins: [BaseUpdate],

  mounted() {
    const query = this.$router.history.current.query;
    if(is.empty(query)) {
      this.$router.push(Config.BAD_REQUEST_PATH);
    } else {
      console.log(this.$router.history.current.name + ' Update Start target = ' + query.id);
      this.initForm(query.id);
    }
  },

  methods: {
    initForm: id => { /* callApi */ }, //<--- 個別に定義
    callUpdate: id => { /* callApi */ }, //<--- 個別に定義
    update() {
      this.callUpdate(this.form.values())
                    .then(() => this.$router.push({path: this.completePath, query: { to: this.listPath } }))
                    .catch(apiHandleErr)
    },
  },

  computed: {
    type: () => 'update',
    screenId: () => null, //<--- 個別に定義
    namespace: () => null, //<--- 個別に定義
    columSetting() { return null }, //<--- 個別に定義
    completePath() { return '/' + this.namespace + PATH_LIST.EDIT_COMPLETE },
  },
}