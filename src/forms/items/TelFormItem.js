import { BaseFormItem } from '@/lib';
import { isTel } from '@/helpers/validators';

export default class TelFormItem extends BaseFormItem {
  constructor(value = '') {
    super(value);

    this._addValidators();
  }

  _addValidators() {
    this.addValidator({
      message: '電話番号を入力してください',
      validator: isTel,
    });
  }
}
