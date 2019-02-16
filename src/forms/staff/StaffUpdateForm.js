import { BaseForm } from '@/lib';
import { NameFormItem, EmailFormItem, TelFormItem } from '@/forms/items';

export class StaffUpdateForm extends BaseForm {
  constructor({
    firstName = '',
    lastName = '',
    email = '',
    tel = '',
  } = {}) {
    super();
    this.addItem('firstName', new NameFormItem(firstName).validate());
    this.addItem('lastName', new NameFormItem(lastName).validate());
    this.addItem('email', new EmailFormItem(email).validate());
    this.addItem('tel', new TelFormItem(tel).validate());
  }
}
