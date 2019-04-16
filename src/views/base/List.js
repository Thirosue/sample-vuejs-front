import {
  FormInput, FormSelect, FormCheckbox, FormMultiCheckbox, FormMultiSelect,
} from '@/components/form';
import ListResults from '@/components/layouts/ListResults.vue';
import Pager from '@/components/Pager.vue';
import createFile from '@/module/download';
import ErrorHandler from '@/module/ErrorHandler';
import Config from '@/conf/Config';
import { COMMON_MESSAGE } from '@/conf/message';
import { PATH_LIST } from '@/helpers';
import { MUTATION_TYPES } from '@/store';

export default {
  components: {
    FormInput,
    FormSelect,
    FormCheckbox,
    FormMultiCheckbox,
    FormMultiSelect,
    ListResults,
    Pager,
  },

  data: () => ({
    results: [],
    count: null,
    page: null,
    totalPage: null,
  }),

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (vm.updateScreenId.includes(from.path)) {
        vm.$showModal(COMMON_MESSAGE.UPDATED);
      }
    });
  },

  beforeRouteUpdate(to, from, next) {
    this.results = [];
    if (!this.$is.empty(to.query)) {
      this.findAll(to.query);
    }
    next();
  },

  mounted() {
    console.log('BaseList start ...');
    if (!this.$is.empty(this.$router.history.current.query)) {
      this.findAll();
    }
    document.cookie = Config.FUNCTION_ID + this.screenId;
  },

  methods: {
    // callApi: where => { /* callApi */ }, // <--- 個別に定義
    search(page) {
      if (page) {
        this.form.items.page.value = page;
      }
      this.$router.push({ path: this.$router.history.path, query: this.where });
    },
    async findAll() {
      console.log(`search... conditions = ${JSON.stringify(this.where)}`);
      this.$store.commit(MUTATION_TYPES.SET_PROCESSING, true);
      const response = await this.callApi(this.where).catch(ErrorHandler.apiHandleErr);
      this.$store.commit(MUTATION_TYPES.SET_PROCESSING, false);
      this.count = response.count;
      this.page = response.page - 1;
      this.totalPage = response.total_pages;
      this.results = response.data;
    },
    downloadList() {
      if (this.results.length > 0) {
        createFile(this.fileProperties[0], 'text/plain', this.fileProperties[1], this.results);
      }
    },
  },

  computed: {
    screenId: () => null, // <--- 個別に定義
    namespace: () => null, // <--- 個別に定義
    fileProperties: () => ['ファイル名記載', 'ファイルヘッダ定義設定'], // <--- 個別に定義
    columSetting: () => null, // <--- 個別に定義
    updateScreenId() { return [PATH_LIST.EDIT_COMPLETE, PATH_LIST.REGISTER_COMPLETE].map(str => `/${this.namespace}${str}`); },
    where() { return this.form.notNullValues(); },
    labels() { return this.$_.orderBy(this.columSetting, 'order').map(row => row.value); },
    resultKeys() { return this.$_.orderBy(this.columSetting, 'order').map(row => row.key); },
  },
};
