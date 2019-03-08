import { BaseFormItem } from '@/lib';

export default class TextFormItem extends BaseFormItem {
  constructor(value = '', maxLength) {
    super(value || '');
    this.maxLength = maxLength;
  }
}
