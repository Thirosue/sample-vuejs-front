import { BaseForm } from '@/lib';
import { MultiSelectFormItem } from '@/forms/items';
import { set } from '@/helpers/list';

export class InquirySearchForm2 extends BaseForm {
  constructor({
    genre = [],
    rows = '',
    page = '',
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

    // for list search
    set(this, rows, page);
  }
}
