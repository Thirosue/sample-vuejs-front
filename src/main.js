import Vue from 'vue';
import App from './App.vue';
import router from '@/router';
import store from '@/store';
import './registerServiceWorker';

// add plugin for global
import MyApplicationPlugin from '@/module/plugin/application';

// add filter for global
import filter from '@/module/filter';

// add directive for global
import directive from '@/module/directive';

// add compornent for global
import NavBar from '@/components/layouts/Navbar.vue';
import Footer from '@/components/layouts/Footer.vue';
import Pager from '@/components/Pager.vue';
import Searching from '@/components/Searching.vue';

Vue.config.productionTip = false;
Vue.use(MyApplicationPlugin);

Vue.filter('YYYYMMDD', filter.YYYYMMDD);
Vue.filter('YYMMDD_YYYYMMDD', filter.YYMMDD_YYYYMMDD);
Vue.filter('YYYYMMDDHHmm', filter.YYYYMMDDHHmm);
Vue.filter('YYYYMMDDHHmmss', filter.YYYYMMDDHHmmss);
Vue.filter('joinComma', filter.joinComma);
Vue.filter('joinSpace', filter.joinSpace);
Vue.filter('AddComma', filter.AddComma);
Vue.filter('Flag', filter.Flag);

Vue.directive('focus', directive.focus);

Vue.component('sample-navbar', NavBar);
Vue.component('sample-footer', Footer);
Vue.component('sample-pager', Pager);
Vue.component('sample-searching', Searching);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
