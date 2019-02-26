import { BaseFormItem } from '@/lib';
import { isDate } from '@/helpers/validators';

export class DateFormItem extends BaseFormItem {
  constructor(value = null) {
    super(value);

    this._addValidators();
  }

  _addValidators() {
    if(this._value) {
      this.addValidator({
        message: '有効な日付を入力してください。',
        validator: isDate,
      });
    }
  }
}
