import _ from 'lodash';
import { BaseSelectFormItem } from '@/lib';

export default class MultiSelectFormItem extends BaseSelectFormItem {
  constructor(value = [], options = []) {
    super(_.flattenDeep([value]));
    this.options = options;
  }
}
