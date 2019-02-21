import { BaseFormItem } from '@/lib';
import { isNotEmptyString, isExpectLength } from '@/helpers/validators';

export class PasswordFormItem extends BaseFormItem {
  constructor(value = '') {
    super(value);
    this.minlength = 8;
    this.maxlength = 65;

    this._addValidators();
  }

  _addValidators() {
    this.addValidator({
      message: '入力が必須の項目です',
      validator: this._isEmptyValidator,
      stop: true,
    });

    this.addValidator({
      message: `${this.minlength}~${this.maxlength - 1}文字で入力してください`,
      validator: this._isExpectLengthValidator,
    });
  }

  _isEmptyValidator(value) {
    return isNotEmptyString(value);
  }

  _isExpectLengthValidator(value) {
    return isExpectLength(value, {
      min: this.minlength,
      max: this.maxlength - 1,
    });
  }
}
