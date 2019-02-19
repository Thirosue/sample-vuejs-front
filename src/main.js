// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@babel/polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'

Vue.config.productionTip = false

// add plugin for global
import MyApplicationPlugin from '@/module/plugin/application'
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
import NavBar from '@/components/layouts/Navbar'
import Footer from '@/components/layouts/Footer'
import Pager from '@/components/Pager'
import Searching from '@/components/Searching'

Vue.component('sample-navbar', NavBar)
Vue.component('sample-footer', Footer)
Vue.component('sample-pager', Pager)
Vue.component('sample-searching', Searching)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
