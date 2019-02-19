import { BaseForm } from '@/lib';
import { TextFormItem, IntegerFormItem, BooleanFormItem, SelectFormItem } from '@/forms/items';

export class CodeUpdateForm extends BaseForm {
  constructor({
    id = '',
    codeCategoryId = '',
    categoryKey = '',
    categoryName = '',
    codeKey = '',
    codeValue = '',
    codeAlias = '',
    attribute1 = '',
    attribute2 = '',
    attribute3 = '',
    attribute4 = '',
    attribute5 = '',
    attribute6 = '',
    displayOrder = null,
    isInvalid = false,
    version = '',
  } = {},
  codeCategories = []) {
    super();
    this.addItem('id', new TextFormItem(id));
    this.addItem('codeCategoryId', new SelectFormItem(codeCategoryId, codeCategories, true).validate());
    this.addItem('categoryKeyText', new TextFormItem(categoryKey));
    this.addItem('categoryNameText', new TextFormItem(categoryName));
    this.addItem('codeKey', new TextFormItem(codeKey, true, 50));
    this.addItem('codeValue', new TextFormItem(codeValue, false, 100).validate());
    this.addItem('codeAlias', new TextFormItem(codeAlias, false, 100).validate());
    this.addItem('attribute1', new TextFormItem(attribute1, false, 2).validate());
    this.addItem('attribute2', new TextFormItem(attribute2, false, 2).validate());
    this.addItem('attribute3', new TextFormItem(attribute3, false, 2).validate());
    this.addItem('attribute4', new TextFormItem(attribute4, false, 2).validate());
    this.addItem('attribute5', new TextFormItem(attribute5, false, 2).validate());
    this.addItem('attribute6', new TextFormItem(attribute6, false, 2).validate());
    this.addItem('displayOrder', new IntegerFormItem(displayOrder, true).validate());
    this.addItem('isInvalid', new BooleanFormItem(isInvalid));

    this.addItem('version', new TextFormItem(version));
  }
}
