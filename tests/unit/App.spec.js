import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

import App from '@/App';
import * as session from '@/store/modules/session';
import * as form from '@/store/modules/form';
import * as master from '@/store/modules/master';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

const router = new VueRouter();

describe('App view', () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        session,
        form,
        master,
      },
    });
  });

  it('mount', () => {
    const wrapper = shallowMount(App, { store, router, localVue });
    expect(wrapper.isVueInstance()).toBe(true);
  });
});
