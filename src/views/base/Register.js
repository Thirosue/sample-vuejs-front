import ErrorHandler from '@/module/ErrorHandler';
import { PATH_LIST } from '@/helpers';

export default {
  methods: {
    // callApi: id => { /* callApi */ }, // <--- 個別に定義
    create() {
      this.callApi(this.form.notNullValues())
        .then(() => this.$router.push({ path: this.completePath, query: { to: this.listPath } }))
        .catch(ErrorHandler.apiHandleErr);
    },
  },

  computed: {
    screenId: () => null, // <--- 個別に定義
    namespace: () => null, // <--- 個別に定義
    completePath() { return `/${this.namespace}${PATH_LIST.REGISTER_COMPLETE}`; },
  },
};
