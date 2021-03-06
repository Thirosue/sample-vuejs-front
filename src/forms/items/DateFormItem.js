import { BaseFormItem } from '@/lib';
import { isDate } from '@/helpers/validators';

export default class DateFormItem extends BaseFormItem {
  constructor(value = null) {
    super(value);

    this._addValidators();
  }

  _addValidators() {
    this.addValidator({
      message: '有効な日付を入力してください。',
      validator: isDate,
    });
  }
}
