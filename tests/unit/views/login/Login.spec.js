import { shallowMount, mount } from '@vue/test-utils';
import Login from '@/views/login/Login';
import { _localVue, _localStore } from '../lib/testHelper';

const localVue = _localVue();

/* elements */
const getEmail = wrapper => wrapper.find('#email');
const getPassword = wrapper => wrapper.find('#password');
const getError = wrapper => wrapper.find('.is-danger');
const getSubmitButton = wrapper => wrapper.find('#form-submit');

/* setup */
const initMount = store => {
  const wrapper = mount(Login, { store, localVue });
  const email = getEmail(wrapper);
  const password = getPassword(wrapper);
  const errorMsg = getError(wrapper);
  const submitButton = getSubmitButton(wrapper);
  return {
    email,
    password,
    errorMsg,
    submitButton
  };
}

describe('Login view', () => {
  let store;

  beforeEach(() => {
    store = _localStore();
  });

  it('mount', () => {
    const wrapper = shallowMount(Login, { store, localVue });
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('email format validation', () => {
    const { email, errorMsg } = initMount(store);
    email.setValue('hoge');
    email.trigger('blur');
    console.log(errorMsg.text());
    expect(errorMsg.text()).not.toHaveLength(0);
  });

  it('email empty validation', () => {
    const { email, errorMsg } = initMount(store);
    email.setValue('hoge');
    email.setValue('');
    email.trigger('blur');
    console.log(errorMsg.text());
    expect(errorMsg.text()).not.toHaveLength(0);
  });

  it('password empty validation', () => {
    const { password, errorMsg } = initMount(store);
    password.setValue('hoge');
    password.setValue('');
    password.trigger('blur');
    console.log(errorMsg.text());
    expect(errorMsg.text()).not.toHaveLength(0);
  });

  it('login button enabled', () => {
    const { email, password, errorMsg, submitButton } = initMount(store);

    expect(submitButton.attributes().disabled).not.toHaveLength(0);
    email.setValue('test@sample.com');
    password.setValue('password');
    password.trigger('blur');
    expect(errorMsg.text()).toHaveLength(0);
    expect(submitButton.attributes().disabled).toBe(undefined);
  });
});
