import { BaseSelectFormItem } from '@/lib';

export default class SelectFormItem extends BaseSelectFormItem {
  constructor(value = '', options = []) {
    super(value);
    this.options = options;
  }
}
