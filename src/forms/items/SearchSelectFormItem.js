import { BaseSelectFormItem } from '@/lib';

export class SearchSelectFormItem extends BaseSelectFormItem {
  constructor(value = '', options = []) {
    super(value);
    this.options = options;

    this._addValidators();
  }

  _addValidators() {
    //
  }
}
