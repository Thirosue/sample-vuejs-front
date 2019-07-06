import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import Config from '@/conf/Config';
import Statistics from '@/module/Statistics';
import { SESSION_GETTER_TYPES } from '@/store/modules/session';
import { buildPath } from '@/helpers';
import { isEmpty } from '@/helpers/validators';
import { authApi } from '@/module/Api';
import ErrorTracking from '@/module/ErrorTracking';

import BadRequest from '@/views/error/BadRequest.vue';
import SessionTimeOut from '@/views/error/SessionTimeOut.vue';
import SystemError from '@/views/error/SystemError.vue';
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
      path: Config.SESSION_TIMEOUT_PATH,
      name: 'SessionTimeOut',
      component: SessionTimeOut,
      meta: {
        requiresAuth: false,
        title: 'セッションタイムアウト',
      },
    },
    {
      path: Config.BAD_REQUEST_PATH,
      name: 'BadRequest',
      component: BadRequest,
      meta: {
        requiresAuth: false,
        title: '不正な画面遷移',
      },
    },
    {
      path: Config.SYSERR_PATH,
      name: 'SystemError',
      component: SystemError,
      meta: {
        requiresAuth: false,
        title: '予期せぬエラー',
      },
    },
    {
      path: Config.LOGIN_PATH,
      name: 'Login',
      component: Login,
      meta: {
        requiresAuth: false,
        title: 'ログイン',
      },
    },
    {
      path: Config.LOGOUT_PATH,
      name: 'Logout',
      component: Logout,
      meta: {
        requiresAuth: false,
        title: 'ログアウト',
      },
    },
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
        requiresAuth: true,
        title: 'ポータルトップ',
        allowRoles: [Config.ADMIN, Config.OPERATOR],
      },
    },
    {
      path: Config.EDIT_PASSWORD,
      name: 'PasswordEdit',
      component: PasswordEdit,
      meta: {
        requiresAuth: true,
        title: 'パスワード編集',
        allowRoles: [Config.ADMIN, Config.OPERATOR],
      },
    },
    {
      path: Config.INQUIRY,
      name: 'Inquiry',
      component: Inquiry,
      meta: {
        requiresAuth: true,
        title: 'お問い合わせ',
        allowRoles: [Config.ADMIN, Config.OPERATOR],
      },
    },
    {
      path: STAFF.LIST,
      name: 'StaffList',
      component: StaffList,
      meta: {
        requiresAuth: true,
        title: '担当者一覧',
        allowRoles: [Config.ADMIN],
      },
    },
    {
      path: `${STAFF.DETAIL}/:id`,
      name: 'StaffDetail',
      component: StaffDetail,
      meta: {
        requiresAuth: true,
        title: '担当者詳細',
        allowRoles: [Config.ADMIN],
      },
    },
    {
      path: STAFF.EDIT,
      name: 'StaffEdit',
      component: StaffEdit,
      meta: {
        requiresAuth: true,
        title: '担当者編集',
        allowRoles: [Config.ADMIN],
      },
    },
    {
      path: STAFF.EDIT_COMPLETE,
      name: 'StaffEditComplete',
      component: Complete,
      meta: {
        requiresAuth: true,
        title: '担当者編集完了',
        allowRoles: [Config.ADMIN],
      },
    },
    {
      path: STAFF.REGISTER,
      name: 'StaffRegister',
      component: StaffRegister,
      meta: {
        requiresAuth: true,
        title: '担当者登録',
        allowRoles: [Config.ADMIN],
      },
    },
    {
      path: STAFF.REGISTER_COMPLETE,
      name: 'StaffRegisterComplete',
      component: Complete,
      meta: {
        requiresAuth: true,
        title: '担当者登録完了',
        allowRoles: [Config.ADMIN],
      },
    },
    {
      path: CODE.LIST,
      name: 'CodeList',
      component: CodeList,
      meta: {
        requiresAuth: true,
        title: 'コード一覧',
        allowRoles: [Config.ADMIN, Config.OPERATOR],
      },
    },
    {
      path: `${CODE.DETAIL}/:id`,
      name: 'CodeDetail',
      component: CodeDetail,
      meta: {
        requiresAuth: true,
        title: 'コード詳細',
        allowRoles: [Config.ADMIN, Config.OPERATOR],
      },
    },
    {
      path: CODE.EDIT,
      name: 'CodeEdit',
      component: CodeEdit,
      meta: {
        requiresAuth: true,
        title: 'コード編集',
        allowRoles: [Config.ADMIN, Config.OPERATOR],
      },
    },
    {
      path: CODE.EDIT_COMPLETE,
      name: 'CodeEditComplete',
      component: Complete,
      meta: {
        requiresAuth: true,
        title: 'コード編集完了',
        allowRoles: [Config.ADMIN, Config.OPERATOR],
      },
    },
    {
      path: CODE.REGISTER,
      name: 'CodeRegister',
      component: CodeRegister,
      meta: {
        requiresAuth: true,
        title: 'コード登録',
        allowRoles: [Config.ADMIN, Config.OPERATOR],
      },
    },
    {
      path: CODE.REGISTER_COMPLETE,
      name: 'CodeRegisterComplete',
      component: Complete,
      meta: {
        requiresAuth: true,
        title: 'コード登録完了',
        allowRoles: [Config.ADMIN, Config.OPERATOR],
      },
    },
    {
      path: INQUIRY.LIST,
      name: 'InquiryList',
      component: InquiryList,
      meta: {
        requiresAuth: true,
        title: 'お問い合わせ一覧',
        allowRoles: [Config.ADMIN, Config.OPERATOR],
      },
    },
    {
      path: `${INQUIRY.LIST}2`,
      name: 'InquiryList2',
      component: InquiryList2,
      meta: {
        requiresAuth: true,
        title: 'お問い合わせ一覧２',
        allowRoles: [Config.ADMIN, Config.OPERATOR],
      },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  console.log('__beforeEach__');
  document.title = `Vue Sample ｜ ${to.meta.title}`;
  if (isEmpty(to.meta.title)) { // ルーティングなし
    console.log('nothing to route table');
    next(Config.BAD_REQUEST_PATH);
    return;
  }
  const session = store.getters[SESSION_GETTER_TYPES.VALUES];
  if (to.meta.requiresAuth) {
    // 未ログイン時はログインページへリダイレクト
    if (isEmpty(session)) {
      console.log('Redirect to Login Form');
      next(Config.LOGIN_PATH);
      return;
    }

    // 権限エラーのハンドリング
    if (!to.meta.allowRoles.some(role => session.roles.includes(role))) {
      console.log('UnAuthorize Action');
      next(Config.BAD_REQUEST_PATH);
      return;
    }

    // セッション確認
    await authApi.checkSession()
      .then(() => console.info('session available!'))
      .catch((error) => {
        if (error.response.status === 401) {
          next(Config.SESSION_TIMEOUT_PATH);
        } else {
          next(error);
          next(Config.SYSERR_PATH);
        }
      });
  }
  if (from.path !== to.path) {
    const statistics = new Statistics();
    statistics.setAccessLog(to.path);
  }
  next();
});

// router.afterEach((to, from) => {
// });

router.onError((error) => {
  ErrorTracking.captureException(error);
  ErrorTracking.showReportDialog();
});

export default router;
