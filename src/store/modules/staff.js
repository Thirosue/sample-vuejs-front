import api from '@/module/api'
import apiHelper from '@/module/helper/api'
import Type from '@/store/mutation-types'

//利用するAPIを定義
const findAll = (where) => api.staff.findAll(where)
const findById = (id) => api.staff.findById(id)
const update = (data) => api.staff.update(data)
const create = (data) => api.staff.create(data)
const del = (id) => api.staff.delete(id)

const company = {
  namespaced: true,
  state: {
    namespace: 'staff/',
    listPath: '/staffList',
    editPath: '/staffEdit',
    registerPath: '/staffRegister',
    detailPath: '/staff',
    rows: null,
    count: null,
    page: null,
    totalPage: null,
    sortColumn: null,
    sordOrder: null,
    data: {},
    list: [],
    searching: false,
    updated: false,
  },
  mutations: {
    [Type.SET_DATA] (state, { data }) {
      state.data = Object.assign({}, data)
    },
    [Type.SET_LIST] (state, { results }) {
      state.list = Object.assign(new Array(), results)
    },
    [Type.SET_PAGE] (state, { page }) {
      state.page = page
    },
    [Type.SET_ROWS] (state, { rows }) {
      state.rows = rows
    },
    [Type.SET_COUNT] (state, { count }) {
      state.count = count
    },
    [Type.SET_TOTALPAGE] (state, { totalPage }) {
      state.totalPage = totalPage
    },
    [Type.SET_SEARCHING] (state, { searching }) {
      state.searching = searching
    },
    [Type.SET_SORT_COLUMN] (state, { sortColumn }) {
      state.sortColumn = sortColumn
    },
    [Type.SET_SORT_ORDER] (state, { sortOrder }) {
      state.sertOrder = sortOrder
    },
    [Type.UPDATED] (state, { updated }) {
      state.updated = updated
    },
    [Type.UNSET_LIST] (state) {
      state.count = null
      state.page = null
      state.totalPage = null
      state.list = []
      state.sortColumn = null
      state.sortOrder = null
    },
    [Type.UNSET_ALL] (state) {
      state.rows = null
      state.count = null
      state.page = null
      state.totalPage = null
      state.sortColumn = null
      state.sortOrder = null
      state.data = {}
      state.list = new Array()
      state.searching = false
      state.updated = false
    },
  },
  actions: {
    async [Type.FIND_ALL] ({ dispatch, commit }, where) {
      dispatch(Type.UNSET_LIST)
      dispatch(Type.SET_SEARCH_START)
      let response = await findAll(where)
      apiHelper.setResult(dispatch, response)
      dispatch(Type.SET_SEARCH_END)
    },
    async [Type.FIND_BY_ID] ({ dispatch, commit }, id) {
      dispatch(Type.UNSET_LIST)
      dispatch(Type.SET_SEARCH_START)
      let response = await findById(id)
      commit(Type.SET_DATA, { data : response.data.data[0] })
      dispatch(Type.SET_SEARCH_END)
    },
    async [Type.UPDATE] ({ dispatch }, data) {
      await update(data)
      dispatch(Type.UNSET_LIST)
    },
    async [Type.CREATE] ({ dispatch }, data) {
      await create(data)
      dispatch(Type.UNSET_LIST)
    },
    [Type.SET_LIST] ({commit}, results) { commit(Type.SET_LIST, { results }) },
    [Type.SET_PAGE] ({commit}, page) { commit(Type.SET_PAGE, { page }) },
    [Type.SET_ROWS] ({commit}, rows) { commit(Type.SET_ROWS, { rows }) },
    [Type.SET_COUNT] ({commit}, count) { commit(Type.SET_COUNT, { count }) },
    [Type.SET_TOTALPAGE] ({commit}, totalPage) { commit(Type.SET_TOTALPAGE, { totalPage }) },
    [Type.SET_SEARCH_START] ({commit}) { commit(Type.SET_SEARCHING, { searching: true }) },
    [Type.SET_SEARCH_END] ({commit}) { commit(Type.SET_SEARCHING, { searching: false }) },
    [Type.UPDATED] ({commit}) { commit(Type.UPDATED, { updated: true }) },
    [Type.SET_SORT_COLUMN] ({commit}, sortColumn) { commit(Type.SET_SORT_COLUMN, sortColumn) },
    [Type.SET_SORT_ORDER] ({commit}, sortOrder) { commit(Type.SET_SORT_ORDER, sortOrder) },
    [Type.UNSET_LIST] ({commit}) { commit(Type.UNSET_LIST) },
    [Type.UNSET_ALL] ({commit}) { commit(Type.UNSET_ALL) },
    async [Type.DELETE] ({ dispatch, commit, state }, payload) {
      await del(payload.id)
    },
  }
}

export default company