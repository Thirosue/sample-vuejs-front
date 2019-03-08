import { BaseFormItem } from '@/lib';

export default class BooleanFormItem extends BaseFormItem {
  constructor(value = false) {
    super(Boolean(value));
  }
}
