import { BaseFormItem } from '@/lib';

export class SearchFormItem extends BaseFormItem {
  constructor(value = '') {
    super(value);

    this._addValidators();
  }

  _addValidators() {
    //
  }
}
