import { BaseForm } from '@/lib';
import { TextFormItem, NameFormItem, EmailFormItem, TelFormItem } from '@/forms/items';

export class StaffUpdateForm extends BaseForm {
  constructor({
    id = '',
    lastName = '',
    firstName = '',
    email = '',
    tel = '',
    version = '',
  } = {}) {
    super();
    this.addItem('id', new TextFormItem(id));
    this.addItem('lastName', new NameFormItem(lastName).validate());
    this.addItem('firstName', new NameFormItem(firstName).validate());
    this.addItem('email', new EmailFormItem(email).validate());
    this.addItem('tel', new TelFormItem(tel).validate());
    this.addItem('version', new TextFormItem(version));
  }
}
