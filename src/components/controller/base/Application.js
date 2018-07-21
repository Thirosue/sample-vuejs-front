import handler from '@/module/errorHandler'

export default {
  created() {
    console.log('start SessionCompornents!')
    this.setSessionInfo() //ログイン後の画面遷移でログインユーザのセッション情報を取得しておく、以降キャッシュ利用
    this.setMasterInfo() //ログイン後の画面遷移でマスタ情報を取得しておく、以降キャッシュ利用
  },
  methods: {
    setSessionInfo: function() {
      //TODO
    },
    setMasterInfo: function() {
      //TODO
    },
  },
  computed: {
  },
}