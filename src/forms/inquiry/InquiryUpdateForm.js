import { BaseForm } from '@/lib';
import {
  EmailFormItem, TextFormItem, SelectFormItem, MultiSelectFormItem,
} from '@/forms/items';
import { isNotEmpty } from '@/helpers/validators';

export default class InquiryUpdateForm extends BaseForm {
  constructor({
    name = '',
    email = '',
    category = '',
    genre = [],
    title = '',
    body = '',
  } = {},
  categoriyOptions = [],
  genreOptions = [],
  sexEnum = []) {
    if (categoriyOptions.length === 0) {
      throw new Error('[InquiryUpdateForm] categoriyOptions must not be empty');
    }
    if (genreOptions.length === 0) {
      throw new Error('[InquiryUpdateForm] genreOptions must not be empty');
    }
    if (sexEnum.length === 0) {
      throw new Error('[InquiryUpdateForm] sex sexEnum not be empty');
    }

    super();
    this.addItem('name', new TextFormItem(name));
    this.addItem('email', new EmailFormItem(email));
    this.addItem('category', new SelectFormItem(category, categoriyOptions));
    this.addItem('genre', new MultiSelectFormItem(genre, genreOptions));
    this.addItem('title', new TextFormItem(title));
    this.addItem('body', new TextFormItem(body));

    this.childCount = 0;

    this._addRelationshipValidator();
  }

  addChildren() {
    this.childCount += 1;
    console.log(this.childCount);
  }

  removeChildren() {
    this.childCount -= 1;
    console.log(this.childCount);
  }

  _addRelationshipValidator() {
    this._addTitleValidatorByCategoryOther();
  }

  _addTitleValidatorByCategoryOther() {
    const message = 'カテゴリ「その他」を選択された方はご入力ください';

    const categoryOtherValue = this.items.category.options[
      this.items.category.options.length - 1
    ].value;

    this.items.category.addValueObserver((value) => {
      if (value === categoryOtherValue) {
        this.items.title.addValidator({
          message,
          validator: isNotEmpty,
        });
        this.items.title.validate();
      } else {
        this.items.title.removeValidator({ message });
      }
    });
  }
}
