import api from '@/module/api'
import handler from '@/module/errorHandler'

const master = {
  namespaced: true,
  state: {
    namespace: 'master/',
    codeCategory: [],
  },
  mutations: {
    setCodeCategory (state, { data }) {
      state.codeCategory = Object.assign([], data)
    },
  },
  actions: {
    getCodeCategory ({ commit }) {
      api.master.getCodeCategory()
        .then(response => commit('setCodeCategory', { data : response.data.data }))
        .catch(handler.apiHandleErr)  
    },
  },
}

export default master