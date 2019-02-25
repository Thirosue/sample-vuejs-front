import { BaseForm } from '@/lib';
import { TextFormItem, SelectFormItem, MultiSelectFormItem } from '@/forms/items';
import { set } from '@/helpers/list';

export class InquirySearchForm extends BaseForm {
  constructor({
    category = '',
    genre = [],
    title = '',
    rows = '',
    page = '',
  } = {},
  categoryOptions = [],
  genreOptions = []) {
    if(categoryOptions.length === 0){
      throw new Error(`[InquirySearchForm] categoryOptions must not be empty`);
    };
    if(genreOptions.length === 0){
      throw new Error(`[InquirySearchForm] genreOptions must not be empty`);
    };

    super();
    this.addItem('category', new SelectFormItem(category, categoryOptions));
    this.addItem('genre', new MultiSelectFormItem(genre, genreOptions));
    this.addItem('title', new TextFormItem(title));

    //for list search
    set(this, rows, page);
  }
}
