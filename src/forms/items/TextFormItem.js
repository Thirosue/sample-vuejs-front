import { BaseFormItem } from '@/lib';

export class TextFormItem extends BaseFormItem {
  constructor(value = '', maxLength) {
    super(value ? value : '');
    this.maxLength = maxLength;
  }
}
