import { BaseFormItem } from '@/lib';
import { isInteger } from '@/helpers/validators';

export class IntegerFormItem extends BaseFormItem {
  constructor(value = null, required = false) {
    super(value ? Number(value) : null);
    this.required = required;

    this._addValidators();
  }

  _addValidators() {
    if(this._value) {
      this.addValidator({
        message: '有効な数値を入力してください。',
        validator: this._isInteger,
      });
    }
  }

  _isInteger(value) {
    return isInteger(value);
  }
}
