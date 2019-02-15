import Type from '@/store/mutation-types'

export const setResult = (dispatch, response) => {
  dispatch(Type.SET_LIST, response.data )
  dispatch(Type.SET_COUNT, response.count )
  dispatch(Type.SET_PAGE, ( response.page - 1 ) )
  dispatch(Type.SET_TOTALPAGE, response.total_pages )
}