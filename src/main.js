import Vue from 'vue';
import App from './App.vue';
import router from '@/router';
import store from '@/store';
import './registerServiceWorker';

Vue.config.productionTip = false;

// add plugin for global
import MyApplicationPlugin from '@/module/plugin/application';
Vue.use(MyApplicationPlugin);

// add filter for global
import filter from '@/module/filter';

Vue.filter('YYYYMMDD', filter.YYYYMMDD );
Vue.filter('YYMMDD_YYYYMMDD', filter.YYMMDD_YYYYMMDD );
Vue.filter('YYYYMMDDHHmm', filter.YYYYMMDDHHmm );
Vue.filter('YYYYMMDDHHmmss', filter.YYYYMMDDHHmmss );
Vue.filter('joinComma', filter.joinComma );
Vue.filter('joinSpace', filter.joinSpace );
Vue.filter('AddComma', filter.AddComma);
Vue.filter('Flag', filter.Flag );

// add directive for global
import directive from '@/module/directive';

Vue.directive('focus', directive.focus );

// add compornent for global
import NavBar from '@/components/layouts/Navbar';
import Footer from '@/components/layouts/Footer';
import Pager from '@/components/Pager';
import Searching from '@/components/Searching';

Vue.component('sample-navbar', NavBar);
Vue.component('sample-footer', Footer);
Vue.component('sample-pager', Pager);
Vue.component('sample-searching', Searching);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
