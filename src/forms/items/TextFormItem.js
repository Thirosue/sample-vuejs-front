import { BaseFormItem } from '@/lib';
import { isEmptyString, isExpectLength } from '@/helpers/validators';

export class TextFormItem extends BaseFormItem {
  constructor(value = '', required = false, maxlength = 0, minlength = 0) {
    super(value ? value : '');
    this.required = required;
    this.maxlength = maxlength;
    this.minlength = minlength;

    this._addValidators();
  }

  _addValidators() {
    if(this.required) {
      this.addValidator({
        message: '入力が必須の項目です',
        validator: this._isEmptyValidator,
      });
    }

    if(this.maxlength) {
      this.addValidator({
        message: `${this.maxlength}文字以内で入力してください`,
        validator: this._isMaxLengthValidator,
      });
    }

    if(this.maxlength && this.minlength) {
      this.addValidator({
        message: `${this.minlength}~${this.maxlength - 1}文字で入力してください`,
        validator: this._isExpectLengthValidator,
      });
    }
  }

  _isEmptyValidator(value) {
    return isEmptyString(value) === false;
  }

  _isMaxLengthValidator(value) {
    return isExpectLength(value, { max: this.maxlength });
  }

  _isExpectLengthValidator(value) {
    return isExpectLength(value, {
      min: this.minlength,
      max: this.maxlength - 1,
    });
  }
}
