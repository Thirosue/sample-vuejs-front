import { BaseFormItem } from '@/lib';
import { isEmptyString, isFlag } from '@/helpers/validators';

export class FlagFormItem extends BaseFormItem {
  constructor(value = '', required = false) {
    super(value);
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
        message: '不正な操作が行われました',
        validator: this._Flag,
      });
    }
  }

  _isEmptyValidator(value) {
    return isEmptyString(value) === false;
  }

  _Flag(value) {
    return isFlag(value);
  }
}
