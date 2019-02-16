import _ from 'lodash';
import { apiHandleErr } from '@/module/errorHandler';
import { Config } from '@/conf/config';
import { createView } from '@/helpers/view';

export default {
  data: () => {
    return {
      data: {}
    }
  },
  created () {
    document.cookie = Config.FUNCTION_ID + this.screenId;
  },
  mounted() {
    this.findById(this.$route.params.id);
  },
  methods: {
    callApi: id => { /* callApi */ }, //<--- 個別に定義
    async findById(id) {
      const response = await this.callApi(id).catch(apiHandleErr);
      this.data = _.head(response.data);
    },
    results() { 
      return createView(this.data, this.columSetting);
    },
  },
  computed: {
    screenId: () => null, //<--- 個別に定義
    namespace: () => null, //<--- 個別に定義
    columSetting: () => null, //<--- 個別に定義
  },
}