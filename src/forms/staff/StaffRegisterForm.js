import { BaseForm } from '@/lib';
import { NameFormItem, EmailFormItem, TelFormItem, PasswordFormItem } from '@/forms/items';

export class StaffRegisterForm extends BaseForm {
  constructor({
    lastName = '',
    firstName = '',
    email = '',
    tel = '',
    password = '',
    passwordConfirm = '',
  } = {}) {
    super();
    this.addItem('lastName', new NameFormItem(lastName));
    this.addItem('firstName', new NameFormItem(firstName));
    this.addItem('email', new EmailFormItem(email));
    this.addItem('tel', new TelFormItem(tel));
    this.addItem('password', new PasswordFormItem(password));
    this.addItem('passwordConfirm',new PasswordFormItem(passwordConfirm));

    this._addRelationshipValidator();
  }

  _addRelationshipValidator() {
    this.addRelationshipValidator({
      message: 'パスワードが一致しません',
      names: ['password', 'passwordConfirm'],
      validator: this._matchPassword,
    });
  }

  _matchPassword() {
    if (this.items.password.states.dirty === false) {
      return true;
    }
    if (this.items.passwordConfirm.states.dirty === false) {
      return true;
    }
    return this.items.password.value === this.items.passwordConfirm.value;
  }
}
