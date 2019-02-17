import { BaseFormItem } from '@/lib';

export class BooleanFormItem extends BaseFormItem {
  constructor(value = false) {
    super(Boolean(value));

    this._addValidators();
  }

  _addValidators() {
    //
  }
}
