import is from 'is_js'
import _ from 'lodash'
import Config from '@/conf/config'
import MenuList from '@/conf/menuList'
import MenuCategoryList from '@/conf/menuCategoryList'
import handler from '@/module/errorHandler'

const getTargetList = (targetList, roles) => targetList.filter(row => row.roles.some(role => role === "all" || roles.includes(role)))

export default {
  beforeRouteEnter (to, from, next) {
    console.clear()
    next(vm => {})
  },
  created() {
    if(this.hasState && this.isLogin) {
      this.setMenuList() //ログイン後の画面遷移でログインユーザのメニュー一覧を取得しておく、以降キャッシュ利用
      this.setMasterInfo() //ログイン後の画面遷移でマスタ情報を取得しておく、以降キャッシュ利用  
    }
  },
  methods: {
    setMenuList() {
      if(this.menus.length === 0) {
        const categories = getTargetList(MenuCategoryList, this.roles)
        const menuList = getTargetList(MenuList, this.roles)
        const menuCategories = _.orderBy(categories, 'order')
        const menus = _.orderBy(menuList, 'order')
        this.$store.dispatch('session/setMenuCategory', { menuCategories })
        this.$store.dispatch('session/setMenu', { menus })
      }
    },
    setMasterInfo() {
      if(this.$store.state.master.codeCategory.length === 0) {
        this.$store.dispatch('master/getCodeCategory')
      }
    },
  },
  computed: {
    hasState() { return this.$store !== undefined }, //pluginはステートを持たない
    session() { return this.$store.state.session },
    isLogin() { return this.session.isLogin },
    roles() { return this.session.roleList },
    menuCategories() { return this.session.menuCategories },
    menus() { return this.session.menus },
    hasAdmin() { return this.session.roleList.some(role => role === Config.ADMIN) },
  },
}