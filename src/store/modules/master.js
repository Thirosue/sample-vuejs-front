import { buildModuleTypes } from '@/helpers/store';

const moduleName = 'master';
const GETTER_TYPES = {
  CODE_CATEGORIES: 'CODE_CATEGORIES',
};
const MUTATION_TYPES = {
  SET_CODE_CATEGORIES: 'SET_CODE_CATEGORIES',
  CLEAR_VALUES: 'CLEAR_VALUES',
};

export const MASTER_GETTER_TYPES = buildModuleTypes({
  moduleName,
  types: GETTER_TYPES,
});

export const MASTER_MUTATION_TYPES = buildModuleTypes({
  moduleName,
  types: MUTATION_TYPES,
});

export const namespaced = true;

export const state = {
  codeCategories: null,
};

export const getters = {
  [GETTER_TYPES.CODE_CATEGORIES](state) {
    if (state.codeCategories === null) {
      return {};
    }
    return state.codeCategories;
  },
};

export const mutations = {
  [MUTATION_TYPES.SET_CODE_CATEGORIES](state, values) {
    state.codeCategories = values;
  },

  [MUTATION_TYPES.CLEAR_VALUES](state) {
    state.count = 0;
    state.codeCategories = null;
  },
};