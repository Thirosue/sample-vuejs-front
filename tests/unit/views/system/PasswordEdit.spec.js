import { shallowMount, mount } from '@vue/test-utils';
import { _localVue, _localStore } from '../lib/testHelper';
import VueRouter from 'vue-router';
import Config from '@/conf/Config';
import PasswordEdit from '@/views/system/PasswordEdit.vue';

const localVue = _localVue();
const router = new VueRouter();

/* elements */
const getPassword = wrapper => wrapper.find('#password');
const getPasswordConfirm = wrapper => wrapper.find('#passwordConfirm');
const getPasswordError = wrapper => wrapper.find('.' + Config.MY_APP_PREFIX + '-input-password .is-danger');
const getPasswordConfirmError = wrapper => wrapper.find('.' + Config.MY_APP_PREFIX + '-input-passwordConfirm .is-danger');
const getErrorAll = wrapper => wrapper.findAll('.is-danger');
const getSubmitButton = wrapper => wrapper.find('#form-submit');

/* setup */
const initMount = store => {
  const wrapper = mount(PasswordEdit, { store, router, localVue });
  const password = getPassword(wrapper);
  const passwordConfirm = getPasswordConfirm(wrapper);
  const passwordErrorMsg = getPasswordError(wrapper);
  const passwordConfirmErrorMsg = getPasswordConfirmError(wrapper);
  const allErrorMsg = getErrorAll(wrapper);
  const submitButton = getSubmitButton(wrapper);
  return {
    wrapper,
    password,
    passwordConfirm,
    passwordErrorMsg,
    passwordConfirmErrorMsg,
    allErrorMsg,
    submitButton
  };
}

describe('PasswordEdit view', () => {
  let store;

  beforeEach(() => {
    store = _localStore();
  });

  it('mount', () => {
    const wrapper = shallowMount(PasswordEdit, { store, router, localVue });
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('password empty validation', () => {
    const { password, passwordErrorMsg } = initMount(store);
    password.setValue('hoge');
    password.setValue('');
    password.trigger('blur');
    console.log(passwordErrorMsg.text());
    expect(passwordErrorMsg.text()).not.toHaveLength(0);
  });

  it('password length validation', () => {
    const { password, passwordErrorMsg } = initMount(store);
    password.setValue('hoge');
    password.trigger('blur');
    console.log(passwordErrorMsg.text());
    expect(passwordErrorMsg.text()).not.toHaveLength(0);
  });

  it('passwordConfirm empty validation', () => {
    const { passwordConfirm, passwordConfirmErrorMsg } = initMount(store);
    passwordConfirm.setValue('hoge');
    passwordConfirm.setValue('');
    passwordConfirm.trigger('blur');
    console.log(passwordConfirmErrorMsg.text());
    expect(passwordConfirmErrorMsg.text()).not.toHaveLength(0);
  });

  it('passwordConfirm length validation', () => {
    const { passwordConfirm, passwordConfirmErrorMsg } = initMount(store);
    passwordConfirm.setValue('hoge');
    passwordConfirm.trigger('blur');
    console.log(passwordConfirmErrorMsg.text());
    expect(passwordConfirmErrorMsg.text()).not.toHaveLength(0);
  });

  it('password relation validation is error', () => {
    const { password, passwordConfirm, allErrorMsg } = initMount(store);
    password.setValue('initpass1');
    passwordConfirm.setValue('initpass2');
    passwordConfirm.trigger('blur');
    const relationErrorIndex = allErrorMsg.length - 1;
    console.log(allErrorMsg.at(relationErrorIndex).text());
    expect(allErrorMsg.at(relationErrorIndex).text()).not.toHaveLength(0);
  });

  it('password relation validation is ok', () => {
    const { password, passwordConfirm, allErrorMsg } = initMount(store);
    password.setValue('initpass1');
    passwordConfirm.setValue('initpass1');
    passwordConfirm.trigger('blur');
    const relationErrorIndex = allErrorMsg.length - 1;
    expect(allErrorMsg.at(relationErrorIndex).text()).toHaveLength(0);
  });

  it('when all complete then button enabled', () => {
    const { password, passwordConfirm, allErrorMsg, submitButton } = initMount(store);

    password.setValue('initpass1');
    passwordConfirm.setValue('initpass1');
    passwordConfirm.trigger('blur');
    for (let i = 0; i < allErrorMsg.length;  i++ ) {
      expect(allErrorMsg.at(i).text()).toHaveLength(0);
    }
    expect(submitButton.attributes().disabled).toBe(undefined);
  });
});
