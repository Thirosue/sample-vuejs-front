import { BaseForm } from '@/lib';
import { TextFormItem, BirthDayFormItem, SelectFormItem } from '@/forms/items';

export default class ChildUpdateForm extends BaseForm {
  constructor({
    name = '',
    sex = 'male',
    birthDay = '',
  } = {},
  sexEnum = []) {
    if (sexEnum.length === 0) {
      throw new Error('[ChildUpdateForm] sexEnum must not be empty');
    }

    super();
    this.addItem('name', new TextFormItem(name));
    this.addItem('sex', new SelectFormItem(sex, sexEnum));
    this.addItem('birthDay', new BirthDayFormItem(birthDay));
  }
}
