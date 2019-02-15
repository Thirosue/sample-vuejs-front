import { BaseSelectFormItem } from '@/lib';

export class SortFormItem extends BaseSelectFormItem {
  constructor(value = '', options = []) {
    super(value);
    this.options = options;
  }
}
