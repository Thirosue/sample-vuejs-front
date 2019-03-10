/* eslint-disable */

import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import * as session from '@/store/modules/session';
import * as form from '@/store/modules/form';
import * as master from '@/store/modules/master';

Vue.use(Vuex);

export const GETTER_TYPES = {
  GET_STACKTRACE: 'GET_STACKTRACE',
  GET_SEARCHING: 'GET_SEARCHING',
  GET_LOADING: 'GET_LOADING',
};

export const MUTATION_TYPES = {
  SET_STACKTRACE: 'SET_STACKTRACE',
  SET_SEARCHING: 'SET_SEARCHING',
  SET_LOADING: 'SET_LOADING',
};

const store = new Vuex.Store({
  modules: {
    session,
    master,
    form,
  },

  state: {
    stackTrace: null,
    searching: false,
    loading: false,
    mode: process.env.NODE_ENV,
  },

  getters: {
    [GETTER_TYPES.GET_STACKTRACE](state) {
      return state.stackTrace;
    },
    [GETTER_TYPES.GET_SEARCHING](state) {
      return state.searching;
    },
    [GETTER_TYPES.GET_LOADING](state) {
      return state.loading;
    },
  },

  mutations: {
    [MUTATION_TYPES.SET_STACKTRACE](state, stackTrace) {
      state.stackTrace = stackTrace;
    },
    [MUTATION_TYPES.SET_SEARCHING](state, searching) {
      state.searching = searching;
    },
    [MUTATION_TYPES.SET_LOADING](state, loading) {
      state.loading = loading;
    },
  },

  strict: process.env.NODE_ENV !== 'production',
  plugins: [createPersistedState({ storage: window.sessionStorage })],
});

export default store;
