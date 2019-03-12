import { shallowMount, mount } from '@vue/test-utils';
import { default as _localVue } from '../lib/testHelper';
import VueRouter from 'vue-router';
import { default as _store } from '@/store';
import Config from '@/conf/Config';
import Login from '@/views/login/Login.vue';

const localVue = _localVue();
const router = new VueRouter();

/* elements */
const getEmail = wrapper => wrapper.find('#email');
const getPassword = wrapper => wrapper.find('#password');
const getEmailError = wrapper => wrapper.find('.' + Config.MY_APP_PREFIX + '-input-email .is-danger');
const getPasswordError = wrapper => wrapper.find('.' + Config.MY_APP_PREFIX + '-input-password .is-danger');
const getErrorAll = wrapper => wrapper.findAll('.is-danger');
const getSubmitButton = wrapper => wrapper.find('#form-submit');

/* setup */
const initMount = store => {
  const wrapper = mount(Login, { store, router, localVue });
  const email = getEmail(wrapper);
  const password = getPassword(wrapper);
  const emailErrorMsg = getEmailError(wrapper);
  const passwordErrorMsg = getPasswordError(wrapper);
  const allErrorMsg = getErrorAll(wrapper);
  const submitButton = getSubmitButton(wrapper);
  return {
    wrapper,
    email,
    password,
    emailErrorMsg,
    passwordErrorMsg,
    allErrorMsg,
    submitButton
  };
}

describe('Login view', () => {
  let store;

  beforeEach(() => {
    store = _store;
  });

  it('mount', () => {
    const wrapper = shallowMount(Login, { store, router, localVue });
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('Email をフォーマット不正で入力した場合、Emailフォーマットチェックバリデーションが動作する', () => {
    const { email, emailErrorMsg } = initMount(store);
    email.setValue('hoge');
    email.trigger('blur');
    console.log(emailErrorMsg.text());
    expect(emailErrorMsg.text()).not.toHaveLength(0);
  });

  it('Email を空でフォーカスアウトした場合、必須チェックバリデーションが動作する', () => {
    const { email, emailErrorMsg } = initMount(store);
    email.setValue('hoge');
    email.setValue('');
    email.trigger('blur');
    console.log(emailErrorMsg.text());
    expect(emailErrorMsg.text()).not.toHaveLength(0);
  });

  it('パスワードを規定の長さ以下で入力した場合、length チェックバリデーションが動作する', () => {
    const { password, passwordErrorMsg } = initMount(store);
    password.setValue('hoge');
    password.trigger('blur');
    console.log(passwordErrorMsg.text());
    expect(passwordErrorMsg.text()).not.toHaveLength(0);
  });

  it('パスワードを空でフォーカスアウトした場合、必須チェックバリデーションが動作する', () => {
    const { password, passwordErrorMsg } = initMount(store);
    password.setValue('hoge');
    password.setValue('');
    password.trigger('blur');
    console.log(passwordErrorMsg.text());
    expect(passwordErrorMsg.text()).not.toHaveLength(0);
  });

  it('全てのフィールドに正常値を入力した場合、submit が enable となる', () => {
    const { email, password, allErrorMsg, submitButton } = initMount(store);

    email.setValue('test@sample.com');
    password.setValue('password');
    password.trigger('blur');
    for (let i = 0; i < allErrorMsg.length;  i++ ) {
      expect(allErrorMsg.at(i).text()).toHaveLength(0);
    }
    expect(submitButton.attributes().disabled).toBe(undefined);
  });
});
