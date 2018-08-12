// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'

Vue.config.productionTip = false

// for validate
import VeeValidate, { Validator } from 'vee-validate'
import ja from 'vee-validate/dist/locale/ja'
import validMessage from '@/module/validate'
Validator.localize('ja', ja);
//デフォルトメッセージを上書き
Vue.use(VeeValidate, validMessage.validMessage)

// add plugin for global
import ModalPlugin from '@/module/plugin/modal'
import ToastPlugin from '@/module/plugin/toast'
import MyApplicationPlugin from '@/module/plugin/application'

Vue.use(ModalPlugin)
Vue.use(ToastPlugin)
Vue.use(MyApplicationPlugin)

// add filter for global
import filter from '@/module/filter'

Vue.filter('filter_YYYYMMDD', filter.YYYYMMDD )
Vue.filter('filter_YYMMDD_YYYYMMDD', filter.YYMMDD_YYYYMMDD )
Vue.filter('filter_YYYYMMDDHHmm', filter.YYYYMMDDHHmm )
Vue.filter('filter_YYYYMMDDHHmmss', filter.YYYYMMDDHHmmss )
Vue.filter('filter_AddComma', filter.AddComma)
Vue.filter('filter_Flag', filter.Flag )

// add directive for global
import directive from '@/module/directive'

Vue.directive('disable', directive.disable )
Vue.directive('focus', directive.focus )
Vue.directive('required', directive.required )

// add compornent for global
import NavBar from '@/components/parts/layouts/Navbar'
import Footer from '@/components/parts/layouts/Footer'
import Pager from '@/components/parts/Pager'
import Searching from '@/components/parts/Searching'
import ViewCount from '@/components/parts/ViewCount'

Vue.component('sample-navbar', NavBar)
Vue.component('sample-footer', Footer)
Vue.component('sample-pager', Pager)
Vue.component('sample-searching', Searching)
Vue.component('sample-view-count', ViewCount)

import InputField from '@/components/parts/form/InputField'

Vue.component('sample-input', InputField)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
