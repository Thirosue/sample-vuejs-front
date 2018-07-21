
import api from '@/module/api'
import Type from '@/store/mutation-types'

const SET_SESSION = 'setSession'
const SET_ROLE = 'setRole'
const SET_MENU = 'setMenu'

const session = {
  namespaced: true,
  state: {
    session: null,
    roleList: [],
    menuList: [],
  },
  mutations: {
    [SET_SESSION] (state, { session }) {
      state.session = session
    },
    [SET_ROLE] (state, { data }) {
      state.roleList = Object.assign([], data)
    },
    [SET_MENU] (state, { data }) {
      state.menuList = Object.assign([], data)
    },
    [Type.UNSET_ALL] (state) {
      state.session = null
      state.roleList = []
      state.menuList = []
    }
  },
  actions: {
    async login ({ dispatch, commit }, loginInfo) {
      dispatch(Type.UNSET_ALL)
      const response = await api.auth.doAuth(loginInfo)
      commit(SET_SESSION, { session: response.data.data[0] })
    },
    async setRole ({ dispatch, commit, state }) {
      //TODO
    },
    async setMenu ({ dispatch, commit, state }) {
      //TODO
    },
    async checkSession ({ dispatch, commit, state }) {
      const response = await api.auth.checkSession()
      commit(SET_SESSION, { session: response.data.data[0] })
    },
    async logout ({ dispatch, commit, state }) {
      await api.auth.logout()
      dispatch(Type.UNSET_ALL)
    },
    [Type.UNSET_ALL] ({commit}) { commit(Type.UNSET_ALL) },
  }
}

export default session