import Vue from 'vue'
import Router from 'vue-router'
import Config from '@/conf/config'
import store from '@/store'
import auth from '@/module/auth'
import router from '@/router'

import SystemError from '@/components/controller/error/SystemError'
import BadRequest from '@/components/controller/error/BadRequest'
import SessionTimeOut from '@/components/controller/error/SessionTimeOut'
import Index from '@/components/controller/index/Index'
import Login from '@/components/controller/login/Login'
import StaffList from '@/components/controller/staff/StaffList'
import StaffEdit from '@/components/controller/staff/StaffEdit'
import StaffDetail from '@/components/controller/staff/StaffDetail'

Vue.use(Router)

const StateRoot = store.state

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
      path: StateRoot.staff.listPath,
      name: 'StaffList',
      component: StaffList
    },
    {
      path: StateRoot.staff.editPath + "*",
      name: 'StaffEdit',
      component: StaffEdit
    },
    {
      path: StateRoot.staff.detailPath + "/:id",
      name: 'StaffDetail',
      component: StaffDetail
    },
  ]
})

router.beforeEach((to, from, next) => {
  if(!auth.isAllowAction(to.path, ['admin'])) { //TODO
    console.log('UnAuthorize Action')
    router.push(Config.BAD_REQUEST_PATH)
  }
  auth.checkSession(to.path)
  next()
})

router.afterEach((to, from) => {
})