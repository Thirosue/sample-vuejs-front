import { apiHandleErr } from '@/module/errorHandler';
import BaseUpdate from '@/views/base/Update';
import { PATH_LIST } from '@/helpers/path';

export default {
  mixins: [BaseUpdate],

  methods: {
    callApi: (id) => { /* callApi */ }, // <--- 個別に定義
    create() {
      this.callApi(this.form.notNullValues())
        .then(() => this.$router.push({ path: this.completePath, query: { to: this.listPath } }))
        .catch(apiHandleErr);
    },
  },

  computed: {
    screenId: () => null, // <--- 個別に定義
    namespace: () => null, // <--- 個別に定義
    completePath() { return `/${this.namespace}${PATH_LIST.REGISTER_COMPLETE}`; },
  },
};
