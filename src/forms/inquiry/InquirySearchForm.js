import { BaseForm } from '@/lib';
import { TextFormItem, SelectFormItem, MultiSelectFormItem } from '@/forms/items';
import { set } from '@/helpers/list';

export class InquirySearchForm extends BaseForm {
  constructor({
    categotry = '',
    genre = [],
    title = '',
    rows = '',
    page = '',
  } = {},
  categoriyOptions = [],
  genreOptions = []) {
    if(categoriyOptions.length === 0){
      throw new Error(`[InquirySearchForm] categoriyOptions must not be empty`);
    };
    if(genreOptions.length === 0){
      throw new Error(`[InquirySearchForm] genreOptions must not be empty`);
    };

    super();
    this.addItem('categotry', new SelectFormItem(categotry, categoriyOptions));
    this.addItem('genre', new MultiSelectFormItem(genre, genreOptions));
    this.addItem('title', new TextFormItem(title));

    //for list search
    set(this, rows, page);
  }
}
