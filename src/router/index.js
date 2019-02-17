import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import router from '@/router';
import { Config } from '@/conf/config';
import { isAllowAction, checkSession } from '@/module/auth';
import { setAccessLog } from '@/module/statistics';
import { SESSION_GETTER_TYPES } from '@/store/modules/session';

import SystemError from '@/view/error/SystemError';
import BadRequest from '@/view/error/BadRequest';
import SessionTimeOut from '@/view/error/SessionTimeOut';
import Complete from '@/view/common/Complete';
import Index from '@/view/index/Index';
import Login from '@/view/login/Login';
import Logout from '@/view/login/Logout';
import StaffList from '@/view/staff/StaffList';
import StaffEdit from '@/view/staff/StaffEdit';
import StaffDetail from '@/view/staff/StaffDetail';
import StaffRegister from '@/view/staff/StaffRegister';
import PasswordEdit from '@/view/system/PasswordEdit';
import CodeList from '@/view/code/CodeList';
import CodeDetail from '@/view/code/CodeDetail';
import CodeEdit from '@/view/code/CodeEdit';
import CodeRegister from '@/view/code/CodeRegister';

Vue.use(Router);

const StateRoot = store.state;

export default new Router({
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
      path: StateRoot.staff.listPath,
      name: 'StaffList',
      component: StaffList
    },
    {
      path: StateRoot.staff.editPath,
      name: 'StaffEdit',
      component: StaffEdit
    },
    {
      path: StateRoot.staff.detailPath + "/:id",
      name: 'StaffDetail',
      component: StaffDetail
    },
    {
      path: '/staffEditComplete',
      name: 'StaffEditComplete',
      component: Complete
    },
    {
      path: StateRoot.staff.registerPath,
      name: 'StaffRegister',
      component: StaffRegister
    },
    {
      path: StateRoot.code.listPath,
      name: 'CodeList',
      component: CodeList
    },
    {
      path: StateRoot.code.detailPath + "/:id",
      name: 'CodeDetail',
      component: CodeDetail
    },
    {
      path: StateRoot.code.editPath,
      name: 'CodeEdit',
      component: CodeEdit
    },
    {
      path: StateRoot.code.registerPath,
      name: 'CodeRegister',
      component: CodeRegister
    },
    {
      path: '/codeEditComplete',
      name: 'CodeEditComplete',
      component: Complete
    },
  ]
})

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
})

router.afterEach((to, from) => {
})