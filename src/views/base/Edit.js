import is from 'is_js';
import { mapGetters } from 'vuex';
import ErrorHandler from '@/module/ErrorHandler';
import Config from '@/conf/Config';
import { PATH_LIST } from '@/helpers';
import { FORM_GETTER_TYPES, FORM_MUTATION_TYPES } from '@/store/modules/form';

export default {
  mounted() {
    const { query } = this.$router.history.current;
    if (is.empty(query)) {
      this.$router.push(Config.BAD_REQUEST_PATH);
    } else {
      console.log(`${this.$router.history.current.name} Update Start target = ${query.id}`);
      this.initForm(query.id);
    }
  },

  methods: {
    // callFindById: id => { /* callApi */ }, // <--- 個別に定義
    // callUpdate: id => { /* callApi */ }, // <--- 個別に定義
    async initForm(id) {
      if (is.not.empty(this.cache)) {
        this.form.setValues(this.cache);
        this.$store.commit(FORM_MUTATION_TYPES.CLEAR_VALUES); // 初回のみキャッシュ
      } else {
        console.log('cache not hit! call api');
        const response = await this.callFindById(id).catch(ErrorHandler.apiHandleErr);
        this.form.setValues(this.$_.head(response.data));
      }
    },
    update() {
      this.callUpdate(this.form.values())
        .then(() => this.$router.push({ path: this.completePath, query: { to: this.listPath } }))
        .catch(ErrorHandler.apiHandleErr);
    },
  },

  computed: {
    ...mapGetters({
      cache: FORM_GETTER_TYPES.VALUES,
    }),
    type: () => 'update',
    screenId: () => null, // <--- 個別に定義
    namespace: () => null, // <--- 個別に定義
    columSetting() { return null; }, // <--- 個別に定義
    completePath() { return `/${this.namespace}${PATH_LIST.EDIT_COMPLETE}`; },
  },
};
