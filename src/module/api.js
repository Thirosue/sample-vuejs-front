import is from 'is_js';
import 'whatwg-fetch';
import querystring from 'querystring';

const HOST = location.origin;
const BASE_URL = `${HOST}/admin`;
const ENDPOINT_LOG = `${BASE_URL}/api/log`;
const ENDPOINT_AUTH = `${BASE_URL}/api/auth`;
const ENDPOINT_STAFF = `${BASE_URL}/api/staff`;
const ENDPOINT_CODE = `${BASE_URL}/api/code`;
const ENDPOINT_INQUIRY = `${BASE_URL}/api/inquiry`;

/** *******************
 * Get Settings
 * ****************** */
const _makeGetUrl = (base, where) => base + (is.empty(where) ? '' : `?${querystring.stringify(where)}`);

// get filter
/* filter implements */
const _searchEnd = response => response;


const _checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};

const _toJson = response => response.json();
const _toText = response => response.text();

const _fetchGet = (base, where = {}) => window.fetch(_makeGetUrl(base, where), {
  method: 'GET',
}).then(_searchEnd).then(_checkStatus);

/** *******************
 * Post/Put Settings
 * ****************** */
const _submitButton = () => document.querySelectorAll('.button');
const _updateHeader = ({
  'X-Requested-With': 'csrf', // csrf header
  'Content-Type': 'application/json',
});

const _updateStartFilter = () => {
  if (_submitButton()) {
    Array.from(_submitButton()).forEach(button => button.disabled = true);
  }
};

const _updateEndFilter = () => {
  if (_submitButton()) {
    Array.from(_submitButton()).forEach(button => button.disabled = '');
  }
};

const _updatehEnd = (response) => {
  _updateEndFilter();
  return response;
};

const _postBase = (url, data) => {
  _updateStartFilter();
  return window.fetch(url, {
    method: 'POST',
    headers: _updateHeader,
    body: JSON.stringify(data),
  });
};

const _putBase = (url, data) => {
  _updateStartFilter();
  return window.fetch(url, {
    method: 'PUT',
    headers: _updateHeader,
    body: JSON.stringify(data),
  });
};

const _fetchPost = (url, data) => _postBase(url, data).then(_updatehEnd).then(_checkStatus);
const _fetchPut = (url, data) => _putBase(url, data).then(_updatehEnd).then(_checkStatus);

/** *******************
 * Delete Settings
 * ****************** */
const _fetchDelete = url => window.fetch(url, {
  method: 'DELETE',
  headers: _updateHeader,
}).then(_checkStatus);

/** *******************
 * API Settings
 * ****************** */
export const logApi = {
  access: path => _fetchGet(`${ENDPOINT_LOG}/access`, path),
  error: data => _fetchPost(`${ENDPOINT_LOG}/error`, data),
};

export const authApi = {
  doAuth: loginInfo => _fetchPost(ENDPOINT_AUTH, loginInfo).then(_toJson),
  checkSession: () => _fetchPut(ENDPOINT_AUTH).then(_toJson),
  logout: () => _fetchDelete(ENDPOINT_AUTH).then(_toJson),
};

export const masterApi = {
  getCodeCategory: () => _fetchGet(`${BASE_URL}/api/codeCategory`).then(_toJson),
  getInquiryCategory: () => _fetchGet(`${BASE_URL}/api/inquiry/category`).then(_toJson),
  getInquiryGenre: () => _fetchGet(`${BASE_URL}/api/inquiry/genre`).then(_toJson),
  getSex: () => _fetchGet(`${BASE_URL}/api/inquiry/sex`).then(_toJson),
};

export const staffApi = {
  findAll: where => _fetchGet(ENDPOINT_STAFF, where).then(_toJson),
  findById: id => _fetchGet(`${ENDPOINT_STAFF}/${id}`).then(_toJson),
  create: data => _fetchPost(ENDPOINT_STAFF, data).then(_toJson),
  update: data => _fetchPut(ENDPOINT_STAFF, data).then(_toJson),
  delete: id => _fetchDelete(`${ENDPOINT_STAFF}/${id}`).then(_toJson),
  changePassword: data => _fetchPost(`${ENDPOINT_STAFF}/updatePassword`, data).then(_toJson),
};

export const codeApi = {
  findAll: where => _fetchGet(ENDPOINT_CODE, where).then(_toJson),
  findById: id => _fetchGet(`${ENDPOINT_CODE}/${id}`).then(_toJson),
  create: data => _fetchPost(ENDPOINT_CODE, data).then(_toJson),
  update: data => _fetchPut(ENDPOINT_CODE, data).then(_toJson),
  delete: id => _fetchDelete(`${ENDPOINT_CODE}/${id}`).then(_toJson),
};

export const inquiryApi = {
  findAll: where => _fetchGet(ENDPOINT_INQUIRY, where).then(_toJson),
  create: data => _fetchPost(ENDPOINT_INQUIRY, data).then(_toJson),
};
