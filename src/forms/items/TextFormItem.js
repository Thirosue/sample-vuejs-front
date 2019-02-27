import { BaseFormItem } from '@/lib';

export class TextFormItem extends BaseFormItem {
  constructor(value = '', maxLength) {
    super(value || '');
    this.maxLength = maxLength;
  }
}
