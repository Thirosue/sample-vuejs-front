/* eslint-disable */

import is from 'is_js';
import _ from 'lodash';
import * as moment from 'moment';
import 'moment/locale/ja';
import store from '@/store';
import router from '@/router';
import { sleep } from '@/helpers';
import Application from '@/views/base/Application';
import { authApi } from '@/module/Api';
import Config from '@/conf/Config';
import { SESSION_MUTATION_TYPES } from '@/store/modules/session';
import { MASTER_MUTATION_TYPES } from '@/store/modules/master';
import Modal from '@/components/Modal.vue';
import Toast from '@/components/Toast.vue';

export default {
  install: (Vue) => {
    Vue.mixin({
      mixins: [Application],
    });

    moment.locale('ja');
    Vue.prototype.$moment = moment;
    Vue.prototype.$is = is;
    Vue.prototype.$_ = _;

    Vue.prototype.$logout = () => {
      console.log('logouted...');
      authApi.logout()
        .finally(() => {
          store.commit(SESSION_MUTATION_TYPES.CLEAR_VALUES);
          store.commit(MASTER_MUTATION_TYPES.CLEAR_VALUES);
          document.cookie = `${Config.COOKIE_ID}; max-age=0`;
          router.push(Config.LOGIN_PATH);
        });
    };

    Vue.prototype.$showToast = async (content, info = 'info', position = 'bottom', duration = 2000) => {
      const toast = Vue.extend(Toast);
      const toastBottoms = Array.from(document.querySelectorAll('.toast')).map(node => node.getBoundingClientRect()).map(rect => rect.top + rect.height);
      const baseY = is.empty(toastBottoms) ? 0 : Math.max.apply(null, toastBottoms);
      const px = `${baseY + 10}px`;
      const component = new toast({
        data: {
          info,
          content,
          position,
          px,
        },
      }).$mount();
      document.querySelector('#app').appendChild(component.$el);
      await sleep(duration);
      component.$el.classList.remove('toast');
      component.$el.classList.add('fadeout');
      await sleep(1500);
      component.$el.remove();
    };

    Vue.prototype.$showModal = (content, title = undefined, submitCallBack = () => {}, cancelCallBack = () => {}, bottomVisible = true) => {
      const modal = Vue.extend(Modal);
      const component = new modal({
        data: {
          title,
          content,
          submitCallBack,
          cancelCallBack,
          bottomVisible,
        },
      }).$mount();
      document.querySelector('#app').appendChild(component.$el);
    };
  },
};
