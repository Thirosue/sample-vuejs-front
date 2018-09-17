import is from 'is_js'
import 'whatwg-fetch'
import querystring from 'querystring'

const HOST = location.origin
const BASE_URL = HOST + '/admin'
const ENDPOINT_LOG = BASE_URL + '/api/log'
const ENDPOINT_AUTH = BASE_URL + '/api/auth'
const ENDPOINT_STAFF = BASE_URL + '/api/staff'
const ENDPOINT_CODE = BASE_URL + '/api/code'

/*********************
 * Get Settings 
 * *******************/
const makeGetUrl = (base, where) => base + ( is.empty(where) ? '' : '?' + querystring.stringify(where) )

//get filter
const searchEnd = response => {
  /* filter implements */
  return response
}

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

const toJson = response => response.json()
const toText = response => response.text()

const fetchGet = (base, where = {}) => 
window.fetch(makeGetUrl(base, where), {
    method: 'GET',
  }
).then(searchEnd).then(checkStatus)

/*********************
 * Post/Put Settings 
 * *******************/
const submitButton = () => document.querySelectorAll(".button")
const updateHeader = ({
  'X-Requested-With': 'csrf',  //csrf header
  'Content-Type': 'application/json'
})

const updateStartFilter = () => {
  if(submitButton()) {
    Array.from(submitButton()).forEach(button=>button.disabled = true)
  }
}

const updateEndFilter = () => {
  if(submitButton()) {
    Array.from(submitButton()).forEach(button=>button.disabled = "")
  }
}

const updatehEnd = response => {
  updateEndFilter()
  return response
}

const postBase = (url, data) => {
  updateStartFilter()
  return window.fetch(url, {
      method: 'POST',
      headers: updateHeader,
      body: JSON.stringify(data)
    }
  )
}

const putBase = (url, data) => {
  updateStartFilter()
  return window.fetch(url, {
      method: 'PUT',
      headers: updateHeader,
      body: JSON.stringify(data)
    }
  )
}

const fetchPost = (url, data) => postBase(url, data).then(updatehEnd).then(checkStatus)
const fetchPut = (url, data) => putBase(url, data).then(updatehEnd).then(checkStatus)

/*********************
 * Delete Settings 
 * *******************/
const fetchDelete = url => 
window.fetch(url, {
    method: 'DELETE',
    headers: updateHeader
  }).then(checkStatus)

/*********************
 * API Settings 
 * *******************/
const log = {
  access: path => fetchGet(ENDPOINT_LOG + "/access", path),
  error: data => fetchPost(ENDPOINT_LOG + "/error", data),
}

const auth = {
  doAuth: loginInfo => fetchPost(ENDPOINT_AUTH, loginInfo).then(toJson),
  checkSession: () => fetchPut(ENDPOINT_AUTH).then(toJson),
  logout: () => fetchDelete(ENDPOINT_AUTH).then(toJson),
}

const master = {
  getCodeCategory: () => fetchGet(BASE_URL + '/api/codeCategory').then(toJson),
}

const staff = {
  findAll: where => fetchGet(ENDPOINT_STAFF, where).then(toJson),
  findById: id => fetchGet(ENDPOINT_STAFF + "/" + id).then(toJson),
  create: data => fetchPost(ENDPOINT_STAFF, data).then(toJson),
  update: data => fetchPut(ENDPOINT_STAFF, data).then(toJson),
  delete: id => fetchDelete(ENDPOINT_STAFF + '/' + id).then(toJson),
}

const code = {
  findAll: where => fetchGet(ENDPOINT_CODE, where).then(toJson),
  findById: id => fetchGet(ENDPOINT_CODE + "/" + id).then(toJson),
  create: data => fetchPost(ENDPOINT_CODE, data).then(toJson),
  update: data => fetchPut(ENDPOINT_CODE, data).then(toJson),
  delete: id => fetchDelete(ENDPOINT_CODE + '/' + id).then(toJson),
}

export default {
  log,
  auth,
  master,
  staff,
  code,
}
