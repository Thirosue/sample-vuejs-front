/* eslint-disable */

import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import * as session from '@/store/modules/session';
import * as form from '@/store/modules/form';
import * as master from '@/store/modules/master';

Vue.use(Vuex);

export const GETTER_TYPES = {
  GET_PROCESSING: 'GET_PROCESSING',
  GET_LOADING: 'GET_LOADING',
};

export const MUTATION_TYPES = {
  SET_PROCESSING: 'SET_PROCESSING',
  SET_LOADING: 'SET_LOADING',
};

const store = new Vuex.Store({
  modules: {
    session,
    master,
    form,
  },

  state: {
    processing: false,
    loading: false,
    mode: process.env.NODE_ENV,
  },

  getters: {
    [GETTER_TYPES.GET_PROCESSING](state) {
      return state.processing;
    },
    [GETTER_TYPES.GET_LOADING](state) {
      return state.loading;
    },
  },

  mutations: {
    [MUTATION_TYPES.SET_PROCESSING](state, processing) {
      state.processing = processing;
    },
    [MUTATION_TYPES.SET_LOADING](state, loading) {
      state.loading = loading;
    },
  },

  strict: process.env.NODE_ENV !== 'production',
  plugins: [createPersistedState({ storage: window.sessionStorage })],
});

export default store;
