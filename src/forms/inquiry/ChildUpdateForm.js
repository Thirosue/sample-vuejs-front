import { BaseForm } from '@/lib';
import { TextFormItem, DateFormItem, SelectFormItem } from '@/forms/items';

export class ChildUpdateForm extends BaseForm {
  constructor({
    name = '',
    sex = '',
    birthDay = '',
  } = {},
  sexEnum = [],
  ) {
    if(sex.length === 0){
      throw new Error(`[ChildUpdateForm] sexEnum must not be empty`);
    };

    super();
    this.addItem('name', new TextFormItem(name));
    this.addItem('sex', new SelectFormItem(sex, sexEnum));
    this.addItem('birthDay', new DateFormItem(birthDay));
  }
}