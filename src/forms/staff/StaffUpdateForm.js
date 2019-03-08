import { BaseForm } from '@/lib';
import { TextFormItem, EmailFormItem, TelFormItem } from '@/forms/items';

export default class StaffUpdateForm extends BaseForm {
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
    this.addItem('lastName', new TextFormItem(lastName).validate());
    this.addItem('firstName', new TextFormItem(firstName).validate());
    this.addItem('email', new EmailFormItem(email).validate());
    this.addItem('tel', new TelFormItem(tel).validate());
    this.addItem('version', new TextFormItem(version));
  }
}
