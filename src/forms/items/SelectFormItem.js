import { BaseSelectFormItem } from '@/lib';

export class SelectFormItem extends BaseSelectFormItem {
  constructor(value = '', options = []) {
    super(value);
    this.options = options;
  }
}
