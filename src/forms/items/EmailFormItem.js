import { BaseFormItem } from '@/lib';
import { isEmail, isExpectLength } from '@/helpers/validators';

export default class EmailFormItem extends BaseFormItem {
  constructor(value = '') {
    super(value);
    this.maxlength = 129;

    this._addValidators();
  }

  _addValidators() {
    this.addValidator({
      message: 'メールアドレスを入力してください',
      validator: isEmail,
    });

    this.addValidator({
      message: `${this.maxlength - 1}文字以内で入力してください`,
      validator: this.isExpectLengthValidator,
    });
  }

  isExpectLengthValidator(value) {
    return isExpectLength(value, {
      max: this.maxlength - 1,
    });
  }
}
