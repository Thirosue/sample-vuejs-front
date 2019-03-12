import { shallowMount, mount } from '@vue/test-utils';
import { default as _localVue } from '../lib/testHelper';
import VueRouter from 'vue-router';
import { default as _store } from '@/store';
import StaffList from '@/views/staff/StaffList.vue';

const localVue = _localVue();
const router = new VueRouter();

/* elements */
const getFirstName = wrapper => wrapper.find('#firstName');
const getLastName = wrapper => wrapper.find('#lastName');
const getEmail = wrapper => wrapper.find('#email');
const getTel = wrapper => wrapper.find('#tel');
const getErrorAll = wrapper => wrapper.findAll('.is-danger');
const getSubmitButton = wrapper => wrapper.find('#form-submit');

/* setup */
const initMount = store => {
  const wrapper = mount(StaffList, { store, router, localVue });
  const firstName = getFirstName(wrapper);
  const lastName = getLastName(wrapper);
  const email = getEmail(wrapper);
  const tel = getTel(wrapper);
  const allErrorMsg = getErrorAll(wrapper);
  const submitButton = getSubmitButton(wrapper);
  return {
    wrapper,
    firstName,
    lastName,
    email,
    tel,
    allErrorMsg,
    submitButton
  };
}

describe('StaffList view', () => {
  let store;

  beforeEach(() => {
    store = _store;
  });

  it('mount', () => {
    const wrapper = shallowMount(StaffList, { store, router, localVue });
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('初期状態で　submit が enable となる', () => {
    const { allErrorMsg, submitButton } = initMount(store);

    for (let i = 0; i < allErrorMsg.length;  i++ ) {
      expect(allErrorMsg.at(i).text()).toHaveLength(0);
    }
    expect(submitButton.attributes().disabled).toBe(undefined);
  });

  it('全てのフィールドに正常値を入力した場合、submit が enable となる', () => {
    const { firstName, lastName, email, tel, allErrorMsg, submitButton } = initMount(store);

    firstName.setValue('firstName');
    lastName.setValue('lastName');
    email.setValue('email');
    tel.setValue('tel');
    tel.trigger('blur');

    for (let i = 0; i < allErrorMsg.length;  i++ ) {
      expect(allErrorMsg.at(i).text()).toHaveLength(0);
    }
    expect(submitButton.attributes().disabled).toBe(undefined);
  });
});
