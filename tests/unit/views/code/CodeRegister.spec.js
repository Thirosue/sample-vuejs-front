import { shallowMount, mount } from '@vue/test-utils';
import { default as _localVue } from '../lib/testHelper';
import VueRouter from 'vue-router';
import { default as _store } from '@/store';
import { MASTER_MUTATION_TYPES } from '@/store/modules/master';
import Config from '@/conf/Config';
import CodeRegister from '@/views/code/CodeRegister.vue';

const localVue = _localVue();
const router = new VueRouter();

/* elements */
const getCodeCategoryId = wrapper => wrapper.find('#codeCategoryId');
const getCodeKey = wrapper => wrapper.find('#codeKey');
const getCodeValue = wrapper => wrapper.find('#codeValue');
const getCodeAlias = wrapper => wrapper.find('#codeAlias');
const getAttribute1 = wrapper => wrapper.find('#attribute1');
const getAttribute2 = wrapper => wrapper.find('#attribute2');
const getAttribute3 = wrapper => wrapper.find('#attribute3');
const getAttribute4 = wrapper => wrapper.find('#attribute4');
const getAttribute5 = wrapper => wrapper.find('#attribute5');
const getAttribute6 = wrapper => wrapper.find('#attribute6');
const getDisplayOrder = wrapper => wrapper.find('#displayOrder');
const getIsInvalid = wrapper => wrapper.find('#isInvalid');

const getCodeCategoryIdError = wrapper => wrapper.find('.' + Config.MY_APP_PREFIX + '-input-codeCategoryId .is-danger');
const getCodeKeyError = wrapper => wrapper.find('.' + Config.MY_APP_PREFIX + '-input-codeKey .is-danger');
const getCodeValueError = wrapper => wrapper.find('.' + Config.MY_APP_PREFIX + '-input-codeValue .is-danger');
const getCodeAliasError = wrapper => wrapper.find('.' + Config.MY_APP_PREFIX + '-input-codeAlias .is-danger');
const getAttribute1Error = wrapper => wrapper.find('.' + Config.MY_APP_PREFIX + '-input-attribute1 .is-danger');
const getAttribute2Error = wrapper => wrapper.find('.' + Config.MY_APP_PREFIX + '-input-attribute2 .is-danger');
const getAttribute3Error = wrapper => wrapper.find('.' + Config.MY_APP_PREFIX + '-input-attribute3 .is-danger');
const getAttribute4Error = wrapper => wrapper.find('.' + Config.MY_APP_PREFIX + '-input-attribute4 .is-danger');
const getAttribute5Error = wrapper => wrapper.find('.' + Config.MY_APP_PREFIX + '-input-attribute5 .is-danger');
const getAttribute6Error = wrapper => wrapper.find('.' + Config.MY_APP_PREFIX + '-input-attribute6 .is-danger');
const getDisplayOrderError = wrapper => wrapper.find('.' + Config.MY_APP_PREFIX + '-input-displayOrder .is-danger');
const getIsInvalidError = wrapper => wrapper.find('.' + Config.MY_APP_PREFIX + '-input-isInvalid .is-danger');

const getErrorAll = wrapper => wrapper.findAll('.is-danger');
const getSubmitButton = wrapper => wrapper.find('#form-submit');

/* setup */
const initMount = store => {
  const wrapper = mount(CodeRegister, { store, router, localVue });

  const codeCategoryId = getCodeCategoryId(wrapper);
  const codeKey = getCodeKey(wrapper);
  const codeValue = getCodeValue(wrapper);
  const codeAlias = getCodeAlias(wrapper);
  const attribute1 = getAttribute1(wrapper);
  const attribute2 = getAttribute2(wrapper);
  const attribute3 = getAttribute3(wrapper);
  const attribute4 = getAttribute4(wrapper);
  const attribute5 = getAttribute5(wrapper);
  const attribute6 = getAttribute6(wrapper);
  const displayOrder = getDisplayOrder(wrapper);
  const isInvalid = getIsInvalid(wrapper);

  const codeCategoryIdError = getCodeCategoryIdError(wrapper);
  const codeKeyError = getCodeKeyError(wrapper);
  const codeValueError = getCodeValueError(wrapper);
  const codeAliasError = getCodeAliasError(wrapper);
  const attribute1Error = getAttribute1Error(wrapper);
  const attribute2Error = getAttribute2Error(wrapper);
  const attribute3Error = getAttribute3Error(wrapper);
  const attribute4Error = getAttribute4Error(wrapper);
  const attribute5Error = getAttribute5Error(wrapper);
  const attribute6Error = getAttribute6Error(wrapper);
  const displayOrderError = getDisplayOrderError(wrapper);
  const isInvalidError = getIsInvalidError(wrapper);

  const allErrorMsg = getErrorAll(wrapper);
  const submitButton = getSubmitButton(wrapper);
  return {
    wrapper,
    codeCategoryId,
    codeCategoryIdError,
    codeKey,
    codeKeyError,
    codeValue,
    codeValueError,
    codeAlias,
    codeAliasError,
    attribute1,
    attribute1Error,
    attribute2,
    attribute2Error,
    attribute3,
    attribute3Error,
    attribute4,
    attribute4Error,
    attribute5,
    attribute5Error,
    attribute6,
    attribute6Error,
    displayOrder,
    displayOrderError,
    isInvalid,
    isInvalidError,
    allErrorMsg,
    submitButton
  };
}

describe('CodeRegister view', () => {
  let store;

  beforeEach(() => {
    store = _store;
    const codeCategories = [{ id: 1, category_name:"hoge"}, { id :2, category_name:"fuga"}]; //dummy response
    store.commit(MASTER_MUTATION_TYPES.SET_CODE_CATEGORIES, codeCategories);
  });

  it('mount', () => {
    const wrapper = shallowMount(CodeRegister, { store, router, localVue });
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('パスワードを空でフォーカスアウトした場合、必須チェックバリデーションが動作する', () => {
    const { codeCategoryId, codeCategoryIdError } = initMount(store);
    codeCategoryId.setValue('hoge');
    codeCategoryId.setValue('');
    codeCategoryId.trigger('blur');
    console.log(codeCategoryIdError.text());
    expect(codeCategoryIdError.text()).not.toHaveLength(0);
  });

  it('コードキーを空でフォーカスアウトした場合、必須チェックバリデーションが動作する', () => {
    const { codeKey, codeKeyError } = initMount(store);
    codeKey.setValue('0');
    codeKey.setValue('');
    codeKey.trigger('blur');
    console.log(codeKeyError.text());
    expect(codeKeyError.text()).not.toHaveLength(0);
  });

  it('コードキーに 51 文字入力した場合、max length チェックバリデーションが NG となる', () => {
    const { codeKey, codeKeyError } = initMount(store);
    codeKey.setValue('012345678901234567890123456789012345678901234567891');
    codeKey.trigger('blur');
    console.log(codeKeyError.text());
    expect(codeKeyError.text()).not.toHaveLength(0);
  });

  it('コードキーに 50 文字入力した場合、max length チェックバリデーションが OK となる', () => {
    const { codeKey, codeKeyError } = initMount(store);
    codeKey.setValue('01234567890123456789012345678901234567890123456789');
    codeKey.trigger('blur');
    expect(codeKeyError.text()).toHaveLength(0);
  });

  it('コード値を空でフォーカスアウトした場合、必須チェックバリデーションが動作する', () => {
    const { codeValue, codeValueError } = initMount(store);
    codeValue.setValue('0');
    codeValue.setValue('');
    codeValue.trigger('blur');
    console.log(codeValueError.text());
    expect(codeValueError.text()).not.toHaveLength(0);
  });

  it('コード値に 101 文字入力した場合、max length チェックバリデーションが NG となる', () => {
    const { codeValue, codeValueError } = initMount(store);
    codeValue.setValue('01234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567891');
    codeValue.trigger('blur');
    console.log(codeValueError.text());
    expect(codeValueError.text()).not.toHaveLength(0);
  });

  it('コード値に 100 文字入力した場合、max length チェックバリデーションが OK となる', () => {
    const { codeValue, codeValueError } = initMount(store);
    codeValue.setValue('0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789');
    codeValue.trigger('blur');
    expect(codeValueError.text()).toHaveLength(0);
  });

  it('コードエイリアスに 101 文字入力した場合、max length チェックバリデーションが NG となる', () => {
    const { codeAlias, codeAliasError } = initMount(store);
    codeAlias.setValue('01234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567891');
    codeAlias.trigger('blur');
    console.log(codeAliasError.text());
    expect(codeAliasError.text()).not.toHaveLength(0);
  });

  it('コードエイリアスに 100 文字入力した場合、max length チェックバリデーションが NG となる', () => {
    const { codeAlias, codeAliasError } = initMount(store);
    codeAlias.setValue('0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789');
    codeAlias.trigger('blur');
    expect(codeAliasError.text()).toHaveLength(0);
  });

  it('属性1 に 3 文字入力した場合、max length チェックバリデーションが NG となる', () => {
    const { attribute1, attribute1Error } = initMount(store);
    attribute1.setValue('012');
    attribute1.trigger('blur');
    console.log(attribute1Error.text());
    expect(attribute1Error.text()).not.toHaveLength(0);
  });

  it('属性1 に 2 文字入力した場合、max length チェックバリデーションが OK となる', () => {
    const { attribute1, attribute1Error } = initMount(store);
    attribute1.setValue('01');
    attribute1.trigger('blur');
    expect(attribute1Error.text()).toHaveLength(0);
  });

  it('属性2 に 3 文字入力した場合、max length チェックバリデーションが NG となる', () => {
    const { attribute2, attribute2Error } = initMount(store);
    attribute2.setValue('012');
    attribute2.trigger('blur');
    console.log(attribute2Error.text());
    expect(attribute2Error.text()).not.toHaveLength(0);
  });

  it('属性2 に 2 文字入力した場合、max length チェックバリデーションが OK となる', () => {
    const { attribute2, attribute2Error } = initMount(store);
    attribute2.setValue('01');
    attribute2.trigger('blur');
    expect(attribute2Error.text()).toHaveLength(0);
  });

  it('属性3 に 3 文字入力した場合、max length チェックバリデーションが NG となる', () => {
    const { attribute3, attribute3Error } = initMount(store);
    attribute3.setValue('012');
    attribute3.trigger('blur');
    console.log(attribute3Error.text());
    expect(attribute3Error.text()).not.toHaveLength(0);
  });

  it('属性3 に 2 文字入力した場合、max length チェックバリデーションが OK となる', () => {
    const { attribute3, attribute3Error } = initMount(store);
    attribute3.setValue('01');
    attribute3.trigger('blur');
    expect(attribute3Error.text()).toHaveLength(0);
  });

  it('属性4 に 3 文字入力した場合、max length チェックバリデーションが NG となる', () => {
    const { attribute4, attribute4Error } = initMount(store);
    attribute4.setValue('012');
    attribute4.trigger('blur');
    console.log(attribute4Error.text());
    expect(attribute4Error.text()).not.toHaveLength(0);
  });

  it('属性4 に 2 文字入力した場合、max length チェックバリデーションが OK となる', () => {
    const { attribute4, attribute4Error } = initMount(store);
    attribute4.setValue('01');
    attribute4.trigger('blur');
    expect(attribute4Error.text()).toHaveLength(0);
  });

  it('属性5 に 3 文字入力した場合、max length チェックバリデーションが NG となる', () => {
    const { attribute5, attribute5Error } = initMount(store);
    attribute5.setValue('012');
    attribute5.trigger('blur');
    console.log(attribute5Error.text());
    expect(attribute5Error.text()).not.toHaveLength(0);
  });

  it('属性5 に 2 文字入力した場合、max length チェックバリデーションが OK となる', () => {
    const { attribute5, attribute5Error } = initMount(store);
    attribute5.setValue('01');
    attribute5.trigger('blur');
    expect(attribute5Error.text()).toHaveLength(0);
  });

  it('属性6 に 3 文字入力した場合、max length チェックバリデーションが NG となる', () => {
    const { attribute6, attribute6Error } = initMount(store);
    attribute6.setValue('012');
    attribute6.trigger('blur');
    console.log(attribute6Error.text());
    expect(attribute6Error.text()).not.toHaveLength(0);
  });

  it('属性6 に 2 文字入力した場合、max length チェックバリデーションが OK となる', () => {
    const { attribute6, attribute6Error } = initMount(store);
    attribute6.setValue('01');
    attribute6.trigger('blur');
    expect(attribute6Error.text()).toHaveLength(0);
  });

  it('全てのフィールドに正常値を入力した場合、submit が enable となる', () => {
    const { codeCategoryId, 
              codeKey,
              codeValue,
              codeAlias,
              attribute1,
              attribute2,
              attribute3,
              attribute4,
              attribute5,
              attribute6,
              displayOrder,
              isInvalid,
              allErrorMsg,
              submitButton } = initMount(store);

    codeCategoryId.setValue('hoge');          
    codeKey.setValue('key');
    codeValue.setValue('value');
    codeAlias.setValue('alias');
    attribute1.setValue('a1');
    attribute2.setValue('a2');
    attribute3.setValue('a3');
    attribute4.setValue('a4');
    attribute5.setValue('a5');
    attribute6.setValue('a6');
    displayOrder.setValue(1);
    isInvalid.setChecked();

    for (let i = 0; i < allErrorMsg.length;  i++ ) {
      expect(allErrorMsg.at(i).text()).toHaveLength(0);
    }
    expect(submitButton.attributes().disabled).toBe(undefined);
  });

});
