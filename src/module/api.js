import axios from 'axios'

const HOST = location.origin
const BASE_URL = HOST + '/admin'
const ENDPOINT_AUTH = BASE_URL + '/api/auth'
const ENDPOINT_STAFF = BASE_URL + '/api/staff'
const API_TIMEOUT = 10000

const submitButton = () => document.getElementById("form-submit")

const myHttpClient = axios.create({ 
  timeout: API_TIMEOUT,
  headers: {'X-Requested-With': 'csrf'}
})

myHttpClient.interceptors.request.use((config) => {
  if(submitButton()) {
    submitButton().disabled = "true"
  }
  return config
})

myHttpClient.interceptors.response.use((response) => {
  if(submitButton()) {
    submitButton().disabled = ""
  }
  return response
})

const auth = {
  doAuth: (loginInfo) => myHttpClient.post(ENDPOINT_AUTH, loginInfo),
  checkSession: () => myHttpClient.put(ENDPOINT_AUTH),
  logout: () => myHttpClient.delete(ENDPOINT_AUTH)
}

const staff = {
  findAll: (where) => myHttpClient.get(ENDPOINT_STAFF, { params: where }),
  findById: (id) => myHttpClient.get(ENDPOINT_STAFF + "/" + id),
  create: (data) => myHttpClient.post(ENDPOINT_STAFF, data),
  update: (data) => myHttpClient.put(ENDPOINT_STAFF, data),
  delete: (id) => myHttpClient.delete(ENDPOINT_STAFF + '/' + id),
}

export default {
  auth,
  staff,
}
