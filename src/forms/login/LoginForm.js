import { BaseForm } from '@/lib';
import {
  EmailFormItem,
  PasswordFormItem,
} from '../items';

export default class LoginForm extends BaseForm {
  constructor({
    email = '',
    password = '',
  } = {}) {
    super();
    this.addItem('email', new EmailFormItem(email));
    this.addItem('password', new PasswordFormItem(password));
  }
}
