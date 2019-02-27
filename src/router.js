import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import router from '@/router';
import { Config } from '@/conf/config';
import { isAllowAction, checkSession } from '@/module/auth';
import { setAccessLog } from '@/module/statistics';
import { SESSION_GETTER_TYPES } from '@/store/modules/session';
import { buildPath } from '@/helpers/path';

import SystemError from '@/views/error/SystemError';
import BadRequest from '@/views/error/BadRequest';
import SessionTimeOut from '@/views/error/SessionTimeOut';
import Complete from '@/views/common/Complete';
import Index from '@/views/index/Index';
import Login from '@/views/login/Login';
import Logout from '@/views/login/Logout';
import StaffList from '@/views/staff/StaffList';
import StaffEdit from '@/views/staff/StaffEdit';
import StaffDetail from '@/views/staff/StaffDetail';
import StaffRegister from '@/views/staff/StaffRegister';
import PasswordEdit from '@/views/system/PasswordEdit';
import CodeList from '@/views/code/CodeList';
import CodeDetail from '@/views/code/CodeDetail';
import CodeEdit from '@/views/code/CodeEdit';
import CodeRegister from '@/views/code/CodeRegister';
import Inquiry from '@/views/system/Inquiry';
import InquiryList from '@/views/inquiry/InquiryList';
import InquiryList2 from '@/views/inquiry/InquiryList2';

Vue.use(Router);

/* namespace */
const NAMESPACE_STAFF = 'staff';
const NAMESPACE_CODE = 'code';
const NAMESPACE_INQUIRY = 'inquiry';

const STAFF = buildPath(NAMESPACE_STAFF);
const CODE = buildPath(NAMESPACE_CODE);
const INQUIRY = buildPath(NAMESPACE_INQUIRY);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: Config.SYSERR_PATH,
      name: 'SystemError',
      component: SystemError
    },
    {
      path: Config.SESSION_TIMEOUT_PATH,
      name: 'SessionTimeOut',
      component: SessionTimeOut
    },
    {
      path: Config.BAD_REQUEST_PATH,
      name: 'BadRequest',
      component: BadRequest
    },
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: Config.LOGIN_PATH,
      name: 'Login',
      component: Login
    },
    {
      path: Config.LOGOUT_PATH,
      name: 'Logout',
      component: Logout
    },
    {
      path: Config.EDIT_PASSWORD,
      name: 'PasswordEdit',
      component: PasswordEdit
    },
    {
      path: Config.INQUIRY,
      name: 'Inquiry',
      component: Inquiry
    },
    {
      path: STAFF.LIST,
      name: 'StaffList',
      component: StaffList
    },
    {
      path: STAFF.DETAIL + "/:id",
      name: 'StaffDetail',
      component: StaffDetail
    },
    {
      path: STAFF.EDIT,
      name: 'StaffEdit',
      component: StaffEdit
    },
    {
      path: STAFF.EDIT_COMPLETE,
      name: 'StaffEditComplete',
      component: Complete
    },
    {
      path: STAFF.REGISTER,
      name: 'StaffRegister',
      component: StaffRegister
    },
    {
      path: STAFF.REGISTER_COMPLETE,
      name: 'StaffRegisterComplete',
      component: Complete
    },
    {
      path: CODE.LIST,
      name: 'CodeList',
      component: CodeList
    },
    {
      path: CODE.DETAIL + "/:id",
      name: 'CodeDetail',
      component: CodeDetail
    },
    {
      path: CODE.EDIT,
      name: 'CodeEdit',
      component: CodeEdit
    },
    {
      path: CODE.EDIT_COMPLETE,
      name: 'CodeEditComplete',
      component: Complete
    },
    {
      path: CODE.REGISTER,
      name: 'CodeRegister',
      component: CodeRegister
    },
    {
      path: CODE.REGISTER_COMPLETE,
      name: 'CodeRegisterComplete',
      component: Complete
    },
    {
      path: INQUIRY.LIST,
      name: 'InquiryList',
      component: InquiryList
    },
    {
      path: INQUIRY.LIST + '2',
      name: 'InquiryList2',
      component: InquiryList2
    },
  ]
});

router.beforeEach(async (to, from, next) => {
  const session = store.getters[SESSION_GETTER_TYPES.VALUES];
  if(!isAllowAction(to.path, session.roles)) {
    console.log('UnAuthorize Action');
    router.push(Config.BAD_REQUEST_PATH);
  }
  checkSession(to.path);
  if(from.path !== to.path) {
    setAccessLog(to.path);
  }
  next();
});

router.afterEach((to, from) => {
});