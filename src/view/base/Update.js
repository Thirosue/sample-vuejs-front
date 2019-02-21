
import { COMMON_MESSAGE } from '@/conf/message';
import { Config } from '@/conf/config';
import { isErrorPath } from '@/helpers/pathHelper';
import { FormInput, FormSelect, FormCheckbox } from '@/components/form';
import { PATH_LIST } from '@/helpers/path';
import { sleep } from '@/helpers/timerHelper'

export default {
  components: {
    FormInput,
    FormSelect,
    FormCheckbox,
  },

  beforeRouteLeave (to, from, next) {
    //更新完了、エラーの場合は、確認ダイアログスキップ
    if(to.path === this.completePath || isErrorPath(to.path)){
      next();
    } else {
      this.$showModal(
        COMMON_MESSAGE.CLEAR_CONFIRM,
        undefined, 
        ()=>{
          if(to.path === Config.LOGOUT_PATH) {
            //編集画面の場合は、確認ダイアログを経てログアウト
            this.$logout();
          }
          next();
        },
        ()=>{/*cancel*/}
      )
    }
  },

  data: () => {
    return {
      data: {},
      form: null,
    }
  },

  created () {
    console.log('BaseUpdate start ...')
    document.cookie = Config.FUNCTION_ID + this.screenId;
  },

  async mounted() {
    //フォームを強制リフレッシュ
    this.form.resetState();
    await sleep(100);
    this.form.updateState();
  },

  computed: {
    namespace: () => null, //<--- 個別に定義
    listPath() { return '/' + this.namespace + PATH_LIST.LIST },
    completePath: () => null, //<--- 個別に定義
  },
}