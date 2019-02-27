import { BaseFormItem } from '@/lib';
import { isFlag } from '@/helpers/validators';

export class FlagFormItem extends BaseFormItem {
  constructor(value = '') {
    super(value);

    this._addValidators();
  }

  _addValidators() {
    if (this._value) {
      this.addValidator({
        message: '不正な操作が行われました',
        validator: this._Flag,
      });
    }
  }

  _Flag(value) {
    return isFlag(value);
  }
}
