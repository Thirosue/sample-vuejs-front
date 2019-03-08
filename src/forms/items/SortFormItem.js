import { BaseSelectFormItem } from '@/lib';

export default class SortFormItem extends BaseSelectFormItem {
  constructor(value = '', options = []) {
    super(value);
    this.options = options;
  }
}
