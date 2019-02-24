import is from 'is_js';
import _ from 'lodash';
import { mapGetters } from 'vuex';
import { Config } from '@/conf/config';
import { SESSION_GETTER_TYPES } from '@/store/modules/session';
import { MASTER_GETTER_TYPES, MASTER_MUTATION_TYPES } from '@/store/modules/master';
import { MenuCategoryList } from '@/conf/menuCategoryList';
import { MenuList } from '@/conf/menuList';
import { Screenlist } from '@/conf/screenList';
import { masterApi } from '@/module/api';
import { apiHandleErr } from '@/module/errorHandler';

const _getTargetList = (targetList, roles) => targetList.filter(row => row.roles.some(role => role === "all" || roles.includes(role)))

export default {
  beforeRouteEnter (to, from, next) {
    next(vm => {})
  },

  beforeRouteLeave (to, from, next) {
    next();
  },

  created() {
    let target = Screenlist.find(s => s.id === this.screenId);
    document.title = target ?  'Vue Sample ｜' + target.name : document.title;
    if(this.hasState && this.isLogin) {
      this.setMasterInfo();
    }
  },

  methods: {
    async setMasterInfo() {
      if(this.$options.name === 'Navbar') {
        if(is.empty(this.codeCategories)) {
          const response = await masterApi.getCodeCategory().catch(apiHandleErr);
          this.$store.commit(MASTER_MUTATION_TYPES.SET_CODE_CATEGORIES, response.data);
        }
        if(is.empty(this.inquiryCategories)) {
          const response = await masterApi.getInquiryCategory().catch(apiHandleErr);
          this.$store.commit(MASTER_MUTATION_TYPES.SET_INQUIRY_CATEGORIES, response);
        }
        if(is.empty(this.inquiryGenre)) {
          const response = await masterApi.getInquiryGenre().catch(apiHandleErr);
          this.$store.commit(MASTER_MUTATION_TYPES.SET_INQUIRY_GENRE, response);
        }
      }
    },
  },

  computed: {
    ...mapGetters({
      session: SESSION_GETTER_TYPES.VALUES,
      isLogin: SESSION_GETTER_TYPES.IS_LOGIN,
      codeCategories: MASTER_GETTER_TYPES.CODE_CATEGORIES,
      inquiryCategories: MASTER_GETTER_TYPES.INQUIRY_CATEGORIES,
      inquiryGenre: MASTER_GETTER_TYPES.INQUIRY_GENRE,
    }),
    hasState() { return this.$store !== undefined }, //pluginはステートを持たない
    roles() { return this.session.roles ? this.session.roles : [] },
    menuCategories() { 
      const categories = _getTargetList(MenuCategoryList, this.roles);
      return _.chain(categories)
              .sortBy('order')
              .value();
    },
    menus() { 
      const menuList = _getTargetList(MenuList, this.roles);
      return _.chain(menuList)
              .sortBy('order')
              .value();
    },
    hasAdmin() { return this.session.roles.some(role => role === Config.ADMIN) },
  },
}