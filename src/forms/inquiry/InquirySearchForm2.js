import Config from '@/conf/Config';
import { BaseForm } from '@/lib';
import { MultiSelectFormItem, RowsFormItem, TextFormItem } from '@/forms/items';

export default class InquirySearchForm2 extends BaseForm {
  constructor({
    genre = [],
    rows = Config.DEFAULT_ROWS,
    page = '1',
  } = {},
  categoriyOptions = [],
  genreOptions = []) {
    if (categoriyOptions.length === 0) {
      throw new Error('[InquirySearchForm] categoriyOptions must not be empty');
    }
    if (genreOptions.length === 0) {
      throw new Error('[InquirySearchForm] genreOptions must not be empty');
    }

    super();
    this.addItem('genre', new MultiSelectFormItem(genre, genreOptions));

    this.addItem('rows', new RowsFormItem(rows));
    this.addItem('page', new TextFormItem(page));
  }
}
