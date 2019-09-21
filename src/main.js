/* eslint-disable import/no-extraneous-dependencies */
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';

// for event logging
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';

import Vue from 'vue';
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
import ErrorBoundary from '@/components/ErrorBoundary.vue';
import NavBar from '@/components/layouts/Navbar.vue';
import Footer from '@/components/layouts/Footer.vue';

import App from './App.vue';

Vue.use(Buefy);

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

Vue.component('error-boundary', ErrorBoundary);
Vue.component('sample-navbar', NavBar);
Vue.component('sample-footer', Footer);

Vue.config.errorHandler = (err, vm, info) => {
  console.error('errorHandlererr:', err);
  console.error('errorHandlervm:', vm);
  console.error('errorHandlerinfo:', info);
};

Sentry.init({
  dsn: 'https://50ca12c46e024d1ea7d92aa3270ba917@sentry.io/1444663',
  integrations: [
    new Integrations.Vue({
      Vue,
      attachProps: true,
    }),
  ],
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
