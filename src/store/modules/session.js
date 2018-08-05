
import api from '@/module/api'
import Type from '@/store/mutation-types'

const SET_SESSION = 'setSession'
const SET_ROLE = 'setRole'
const SET_MENU = 'setMenu'
const LOGOUTED = 'logouted'
const LOGGEDIN = 'loggedin'

const session = {
  namespaced: true,
  state: {
    session: null,
    roleList: [],
    menuList: [],
    loggedin: false,
    logouted: false,
  },
  mutations: {
    [SET_SESSION] (state, { session }) {
      state.session = session
    },
    [SET_ROLE] (state, { roles }) {
      state.roleList = Object.assign([], roles)
    },
    [SET_MENU] (state, { menuList }) {
      state.menuList = Object.assign([], menuList)
    },
    [Type.UNSET_ALL] (state) {
      state.session = null
      state.roleList = []
      state.menuList = []
      state.loggedin = false
      state.logouted = false
    },
    [LOGOUTED] (state, { logouted }) {
      state.logouted = logouted
    },
    [LOGGEDIN] (state, { loggedin }) {
      state.loggedin = loggedin
    },
  },
  actions: {
    async login ({ dispatch, commit }, loginInfo) {
      dispatch(Type.UNSET_ALL)
      const response = await api.auth.doAuth(loginInfo)
      commit(SET_SESSION, { session: response.data.data[0] })
      commit(SET_ROLE, { roles: response.data.data[0].roles })
      commit(LOGGEDIN, { loggedin: true })
    },
    async [SET_MENU] ({ dispatch, commit, state }) {
      //TODO
    },
    async checkSession ({ dispatch, commit, state }) {
      const response = await api.auth.checkSession()
      commit(SET_SESSION, { session: response.data.data[0] })
      commit(LOGGEDIN, { loggedin: false })
    },
    async logout ({ dispatch, commit, state }) {
      await api.auth.logout()
      commit(LOGOUTED, { logouted: true })
    },
    [Type.UNSET_ALL] ({commit}) { commit(Type.UNSET_ALL) },
  }
}

export default session