import { mapGetters } from 'vuex';
import { Config } from '@/conf/config';
import { SESSION_GETTER_TYPES } from '@/store/modules/session';
import { MASTER_GETTER_TYPES, MASTER_MUTATION_TYPES } from '@/store/modules/master';
import { MenuCategoryList } from '@/conf/menuCategoryList';
import { MenuList } from '@/conf/menuList';
import { Screenlist } from '@/conf/screenList';
import { masterApi } from '@/module/Api';
import ErrorHandler from '@/module/ErrorHandler';

export default {
  // beforeRouteEnter(to, from, next) {
  //  next((vm) => {});
  // },

  beforeRouteLeave(to, from, next) {
    next();
  },

  created() {
    const target = Screenlist.find(s => s.id === this.screenId);
    document.title = target ? `Vue Sample ｜${target.name}` : document.title;
    if (this.hasState && this.isLogin) {
      this.setMasterInfo();
    }
  },

  methods: {
    async setMasterInfo() {
      if (this.$options.name === 'Navbar') {
        if (this.$is.empty(this.codeCategories)) {
          const response = await masterApi.getCodeCategory().catch(ErrorHandler.apiHandleErr);
          this.$store.commit(MASTER_MUTATION_TYPES.SET_CODE_CATEGORIES, response.data);
        }
        if (this.$is.empty(this.inquiryCategories)) {
          const response = await masterApi.getInquiryCategory().catch(ErrorHandler.apiHandleErr);
          this.$store.commit(MASTER_MUTATION_TYPES.SET_INQUIRY_CATEGORIES, response);
        }
        if (this.$is.empty(this.inquiryGenre)) {
          const response = await masterApi.getInquiryGenre().catch(ErrorHandler.apiHandleErr);
          this.$store.commit(MASTER_MUTATION_TYPES.SET_INQUIRY_GENRE, response);
        }
        if (this.$is.empty(this.sex)) {
          const response = await masterApi.getSex().catch(ErrorHandler.apiHandleErr);
          this.$store.commit(MASTER_MUTATION_TYPES.SET_SEX, response);
        }
      }
    },
    getTargetList: (targetList, roles) => targetList.filter(row => row.roles.some(role => role === 'all' || roles.includes(role))),
  },

  computed: {
    ...mapGetters({
      session: SESSION_GETTER_TYPES.VALUES,
      isLogin: SESSION_GETTER_TYPES.IS_LOGIN,
      codeCategories: MASTER_GETTER_TYPES.CODE_CATEGORIES,
      inquiryCategories: MASTER_GETTER_TYPES.INQUIRY_CATEGORIES,
      inquiryGenre: MASTER_GETTER_TYPES.INQUIRY_GENRE,
      sex: MASTER_GETTER_TYPES.SEX,
    }),
    hasState() { return this.$store !== undefined; }, // pluginはステートを持たない
    roles() { return this.session.roles ? this.session.roles : []; },
    menuCategories() {
      const categories = this.getTargetList(MenuCategoryList, this.roles);
      return this.$_.chain(categories)
        .sortBy('order')
        .value();
    },
    menus() {
      const menuList = this.getTargetList(MenuList, this.roles);
      return this.$_.chain(menuList)
        .sortBy('order')
        .value();
    },
    hasAdmin() { return this.session.roles.some(role => role === Config.ADMIN); },
  },
};
