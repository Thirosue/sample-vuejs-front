import Config from '@/conf/Config';
import { BaseForm } from '@/lib';
import {
  TextFormItem, SelectFormItem, SortFormItem, FlagFormItem, RowsFormItem,
} from '@/forms/items';

export default class CodeSearchForm extends BaseForm {
  constructor({
    categoryKey = '',
    codeKey = '',
    codeAlias = '',
    isInvalid = '',
    rows = Config.DEFAULT_ROWS,
    page = '1',
    sort = '',
  } = {},
  codeCategories = [],
  codeSortItems = []) {
    if (codeCategories.length === 0) {
      throw new Error('[CodeSearchForm] codeCategories must not be empty');
    }
    if (codeSortItems.length === 0) {
      throw new Error('[CodeSearchForm] codeSortItems must not be empty');
    }

    super();
    this.addItem('categoryKey', new SelectFormItem(categoryKey, codeCategories));
    this.addItem('codeKey', new TextFormItem(codeKey));
    this.addItem('codeAlias', new TextFormItem(codeAlias));
    this.addItem('isInvalid', new FlagFormItem(isInvalid));

    this.addItem('rows', new RowsFormItem(rows));
    this.addItem('page', new TextFormItem(page));
    this.addItem('sort', new SortFormItem(sort, codeSortItems));
  }
}
