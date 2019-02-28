import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import { Config } from '@/conf/config';
import Auth from '@/module/Auth';
import Statistics from '@/module/Statistics';
import { SESSION_GETTER_TYPES } from '@/store/modules/session';
import { buildPath } from '@/helpers/path';

import SystemError from '@/views/error/SystemError.vue';
import BadRequest from '@/views/error/BadRequest.vue';
import SessionTimeOut from '@/views/error/SessionTimeOut.vue';
import Complete from '@/views/common/Complete.vue';
import Index from '@/views/index/Index.vue';
import Login from '@/views/login/Login.vue';
import Logout from '@/views/login/Logout.vue';
import StaffList from '@/views/staff/StaffList.vue';
import StaffEdit from '@/views/staff/StaffEdit.vue';
import StaffDetail from '@/views/staff/StaffDetail.vue';
import StaffRegister from '@/views/staff/StaffRegister.vue';
import PasswordEdit from '@/views/system/PasswordEdit.vue';
import CodeList from '@/views/code/CodeList.vue';
import CodeDetail from '@/views/code/CodeDetail.vue';
import CodeEdit from '@/views/code/CodeEdit.vue';
import CodeRegister from '@/views/code/CodeRegister.vue';
import Inquiry from '@/views/system/Inquiry.vue';
import InquiryList from '@/views/inquiry/InquiryList.vue';
import InquiryList2 from '@/views/inquiry/InquiryList2.vue';

Vue.use(Router);

/* namespace */
const NAMESPACE_STAFF = 'staff';
const NAMESPACE_CODE = 'code';
const NAMESPACE_INQUIRY = 'inquiry';

const STAFF = buildPath(NAMESPACE_STAFF);
const CODE = buildPath(NAMESPACE_CODE);
const INQUIRY = buildPath(NAMESPACE_INQUIRY);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: Config.SYSERR_PATH,
      name: 'SystemError',
      component: SystemError,
    },
    {
      path: Config.SESSION_TIMEOUT_PATH,
      name: 'SessionTimeOut',
      component: SessionTimeOut,
    },
    {
      path: Config.BAD_REQUEST_PATH,
      name: 'BadRequest',
      component: BadRequest,
    },
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
    {
      path: Config.LOGIN_PATH,
      name: 'Login',
      component: Login,
    },
    {
      path: Config.LOGOUT_PATH,
      name: 'Logout',
      component: Logout,
    },
    {
      path: Config.EDIT_PASSWORD,
      name: 'PasswordEdit',
      component: PasswordEdit,
    },
    {
      path: Config.INQUIRY,
      name: 'Inquiry',
      component: Inquiry,
    },
    {
      path: STAFF.LIST,
      name: 'StaffList',
      component: StaffList,
    },
    {
      path: `${STAFF.DETAIL}/:id`,
      name: 'StaffDetail',
      component: StaffDetail,
    },
    {
      path: STAFF.EDIT,
      name: 'StaffEdit',
      component: StaffEdit,
    },
    {
      path: STAFF.EDIT_COMPLETE,
      name: 'StaffEditComplete',
      component: Complete,
    },
    {
      path: STAFF.REGISTER,
      name: 'StaffRegister',
      component: StaffRegister,
    },
    {
      path: STAFF.REGISTER_COMPLETE,
      name: 'StaffRegisterComplete',
      component: Complete,
    },
    {
      path: CODE.LIST,
      name: 'CodeList',
      component: CodeList,
    },
    {
      path: `${CODE.DETAIL}/:id`,
      name: 'CodeDetail',
      component: CodeDetail,
    },
    {
      path: CODE.EDIT,
      name: 'CodeEdit',
      component: CodeEdit,
    },
    {
      path: CODE.EDIT_COMPLETE,
      name: 'CodeEditComplete',
      component: Complete,
    },
    {
      path: CODE.REGISTER,
      name: 'CodeRegister',
      component: CodeRegister,
    },
    {
      path: CODE.REGISTER_COMPLETE,
      name: 'CodeRegisterComplete',
      component: Complete,
    },
    {
      path: INQUIRY.LIST,
      name: 'InquiryList',
      component: InquiryList,
    },
    {
      path: `${INQUIRY.LIST}2`,
      name: 'InquiryList2',
      component: InquiryList2,
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const session = store.getters[SESSION_GETTER_TYPES.VALUES];
  if (!Auth.isAllowAction(to.path, session.roles)) {
    console.log('UnAuthorize Action');
    router.push(Config.BAD_REQUEST_PATH);
  }
  Auth.checkSession(to.path);
  if (from.path !== to.path) {
    const statistics = new Statistics();
    statistics.setAccessLog(to.path);
  }
  next();
});

// router.afterEach((to, from) => {
// });

export default router;
