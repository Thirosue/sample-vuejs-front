import { BaseFormItem } from '@/lib';
import { isEmptyString, isInteger } from '@/helpers/validators';

export class IntegerFormItem extends BaseFormItem {
  constructor(value = null, required = false) {
    super(value ? Number(value) : null);
    this.required = required;

    this._addValidators();
  }

  _addValidators() {
    if(this.required) {
      this.addValidator({
        message: '入力が必須の項目です',
        validator: this._isEmptyValidator,
      });
    }

    if(this._value) {
      this.addValidator({
        message: '有効な数値を入力してください。',
        validator: this._isInteger,
      });
    }
  }

  _isEmptyValidator(value) {
    return isEmptyString(value) === false;
  }

  _isInteger(value) {
    return isInteger(value);
  }
}
