import { BaseSelectFormItem } from '@/lib';
import { isEmptyString } from '@/helpers/validators';

export class SelectFormItem extends BaseSelectFormItem {
  constructor(value = '', options = [], required = false) {
    super(value);
    this.options = options;
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
  }

  _isEmptyValidator(value) {
    return isEmptyString(value) === false;
  }
}
