import { BaseFormItem } from '@/lib';
import { isEmptyString, isTel } from '@/helpers/validators';

export class TelFormItem extends BaseFormItem {
  constructor(value = '') {
    super(value);

    this._addValidators();
  }

  _addValidators() {
    //this.addValidator({
    //  message: '入力が必須の項目です',
    //  validator: this._isEmptyValidator,
    //  stop: true,
    //});

    this.addValidator({
      message: '電話番号を入力してください',
      validator: this._isTelValidator,
    });
  }

  _isEmptyValidator(value) {
    return isEmptyString(value) === false;
  }

  _isTelValidator(value) {
    return isTel(value);
  }
}
