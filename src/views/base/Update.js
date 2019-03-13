
import { COMMON_MESSAGE } from '@/conf/message';
import Config from '@/conf/Config';
import { PATH_LIST, includeList, sleep } from '@/helpers';
import {
  FormInput,
  FormSelect,
  FormCheckbox,
  FormMultiCheckbox,
  FormMultiSelect,
  FormTextarea,
  FormRadio,
  FormDatePicker,
} from '@/components/form';

export default {
  components: {
    FormInput,
    FormSelect,
    FormCheckbox,
    FormMultiCheckbox,
    FormMultiSelect,
    FormTextarea,
    FormRadio,
    FormDatePicker,
  },

  beforeRouteLeave(to, from, next) {
    // 以下の場合は、確認ダイアログをスキップする
    //  + 完了画面への遷移
    //  + エラーの場合
    //  + フォームを1回も編集していない場合
    if (to.path === this.completePath
                  || includeList(Config.ERROR_PATH, to.path)
                  || !this.form.isDirty()) {
      next();
    } else {
      this.$showModal(
        COMMON_MESSAGE.CLEAR_CONFIRM,
        undefined,
        () => {
          if (to.path === Config.LOGOUT_PATH) {
            // 編集画面の場合は、確認ダイアログを経てログアウト
            this.$logout();
          }
          next();
        },
        () => { /* cancel */ },
      );
    }
  },

  data: () => ({
    data: {},
    form: null,
  }),

  created() {
    console.log('BaseUpdate start ...');
    document.cookie = Config.FUNCTION_ID + this.screenId;
  },

  async mounted() {
    // フォームを強制リフレッシュ
    this.form.resetState();
    await sleep(100);
    this.form.updateState();
  },

  computed: {
    namespace: () => null, // <--- 個別に定義
    listPath() { return `/${this.namespace}${PATH_LIST.LIST}`; },
    completePath: () => null, // <--- 個別に定義
  },
};
