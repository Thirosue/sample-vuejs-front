import { BaseSelectFormItem } from '@/lib';

export default class RowsFormItem extends BaseSelectFormItem {
  constructor(value = '') {
    super(value);
    this.options = [
      { text: '1件', value: '1' },
      { text: '10件', value: '10' },
      { text: '20件', value: '20' },
      { text: '50件', value: '50' },
      { text: '100件', value: '100' },
    ];
  }
}
