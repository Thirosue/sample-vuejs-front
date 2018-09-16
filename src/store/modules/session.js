
import api from '@/module/api'
import Type from '@/store/mutation-types'
import Config from '@/conf/config'

const SET_SESSION = 'setSession'
const SET_ROLE = 'setRole'
const SET_MENU_CATEGORY = 'setMenuCategory'
const SET_MENU = 'setMenu'
const ISLOGIN = 'isLogin'
const LOGOUTED = 'logouted'
const LOGGEDIN = 'loggedin'

const session = {
  namespaced: true,
  state: {
    session: null,
    roleList: [],
    menuCategories: [],
    menus: [],
    isLogin: false,
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
    [SET_MENU_CATEGORY] (state, { menuCategories }) {
      state.menuCategories = Object.assign([], menuCategories)
    },    
    [SET_MENU] (state, { menus }) {
      state.menus = Object.assign([], menus)
    },
    [Type.UNSET_ALL] (state) {
      state.session = null
      state.roleList = []
      state.menuCategories = []
      state.menus = []
      state.isLogin = false
      state.loggedin = false
      state.logouted = false
    },
    [ISLOGIN] (state, { isLogin }) {
      state.isLogin = isLogin
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
      commit(ISLOGIN, { isLogin: true })
      commit(LOGGEDIN, { loggedin: true })
    },
    [SET_MENU_CATEGORY] ({ commit }, payload) {
      commit(SET_MENU_CATEGORY, { menuCategories: payload.menuCategories })
    },
    [SET_MENU] ({ commit }, payload) {
      commit(SET_MENU, { menus: payload.menus })
    },
    async checkSession ({ commit }) {
      const response = await api.auth.checkSession()
      commit(SET_SESSION, { session: response.data.data[0] })
      commit(LOGGEDIN, { loggedin: false })
    },
    async logout ({ dispatch, commit }) {
      await api.auth.logout()
                      .finally(()=>document.cookie = Config.COOKIE_ID + "; max-age=0")
      dispatch(Type.UNSET_ALL)
      commit(LOGOUTED, { logouted: true })
    },
    [Type.UNSET_ALL] ({commit}) { commit(Type.UNSET_ALL) },
  }
}

export default session