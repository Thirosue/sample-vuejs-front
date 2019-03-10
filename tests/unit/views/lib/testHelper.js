import { createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

// add plugin for global
import MyApplicationPlugin from '@/module/plugin/application';

// add filter for global
import filter from '@/module/filter';

// add directive for global
import directive from '@/module/directive';

// add compornent for global
import NavBar from '@/components/layouts/Navbar.vue';
import Footer from '@/components/layouts/Footer.vue';

const _localVue = () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  localVue.use(VueRouter);

  localVue.use(MyApplicationPlugin);

  localVue.filter('YYYYMMDD', filter.YYYYMMDD);
  localVue.filter('YYMMDD_YYYYMMDD', filter.YYMMDD_YYYYMMDD);
  localVue.filter('YYYYMMDDHHmm', filter.YYYYMMDDHHmm);
  localVue.filter('YYYYMMDDHHmmss', filter.YYYYMMDDHHmmss);
  localVue.filter('joinComma', filter.joinComma);
  localVue.filter('joinSpace', filter.joinSpace);
  localVue.filter('AddComma', filter.AddComma);
  localVue.filter('Flag', filter.Flag);

  localVue.directive('focus', directive.focus);

  localVue.component('sample-navbar', NavBar);
  localVue.component('sample-footer', Footer);

  return localVue;
} 

import * as session from '@/store/modules/session';
import * as form from '@/store/modules/form';
import * as master from '@/store/modules/master';

function _localStore() {
  return new Vuex.Store({
    modules: {
      session,
      master,
      form,
    },
  });    
}

export {
  _localVue,
  _localStore,
};