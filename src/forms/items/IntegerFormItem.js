import { BaseFormItem } from '@/lib';
import { isInteger } from '@/helpers/validators';

export default class IntegerFormItem extends BaseFormItem {
  constructor(value = null) {
    super(value ? Number(value) : null);

    this._addValidators();
  }

  _addValidators() {
    this.addValidator({
      message: '有効な数値を入力してください。',
      validator: isInteger,
    });
  }
}
