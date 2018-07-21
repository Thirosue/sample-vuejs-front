import store from '@/store'
import Type from '@/store/mutation-types'

const setResult = (dispatch, response) => {
  dispatch(Type.SET_LIST, response.data.data )
  dispatch(Type.SET_COUNT, response.data.count )
  dispatch(Type.SET_PAGE, ( response.data.page - 1 ) )
  dispatch(Type.SET_TOTALPAGE, response.data.total_pages )
}

const createConditions = (currentQuery, currentPage, currentRow) => Object.assign({}, currentQuery, {page : currentPage}, {rows : currentRow})

export default {
  setResult,
  createConditions,
}