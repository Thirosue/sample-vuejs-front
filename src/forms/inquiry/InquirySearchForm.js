import Config from '@/conf/Config';
import { BaseForm } from '@/lib';
import {
  TextFormItem, SelectFormItem, MultiSelectFormItem, RowsFormItem,
} from '@/forms/items';

export default class InquirySearchForm extends BaseForm {
  constructor({
    category = '',
    genre = [],
    title = '',
    rows = Config.DEFAULT_ROWS,
    page = '1',
  } = {},
  categoryOptions = [],
  genreOptions = []) {
    if (categoryOptions.length === 0) {
      throw new Error('[InquirySearchForm] categoryOptions must not be empty');
    }
    if (genreOptions.length === 0) {
      throw new Error('[InquirySearchForm] genreOptions must not be empty');
    }

    super();
    this.addItem('category', new SelectFormItem(category, categoryOptions));
    this.addItem('genre', new MultiSelectFormItem(genre, genreOptions));
    this.addItem('title', new TextFormItem(title));

    this.addItem('rows', new RowsFormItem(rows));
    this.addItem('page', new TextFormItem(page));
  }
}
