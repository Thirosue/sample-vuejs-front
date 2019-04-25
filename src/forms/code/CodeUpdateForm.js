import { BaseForm } from '@/lib';
import {
  TextFormItem, IntegerFormItem, BooleanFormItem, SelectFormItem,
} from '@/forms/items';

export default class CodeUpdateForm extends BaseForm {
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
    this.addItem('categoryKey', new TextFormItem(categoryKey));
    this.addItem('categoryName', new TextFormItem(categoryName));
    this.addItem('codeKey', new TextFormItem(codeKey));
    this.addItem('codeValue', new TextFormItem(codeValue).validate());
    this.addItem('codeAlias', new TextFormItem(codeAlias).validate());
    this.addItem('attribute1', new TextFormItem(attribute1).validate());
    this.addItem('attribute2', new TextFormItem(attribute2).validate());
    this.addItem('attribute3', new TextFormItem(attribute3).validate());
    this.addItem('attribute4', new TextFormItem(attribute4).validate());
    this.addItem('attribute5', new TextFormItem(attribute5).validate());
    this.addItem('attribute6', new TextFormItem(attribute6).validate());
    this.addItem('displayOrder', new IntegerFormItem(displayOrder).validate());
    this.addItem('isInvalid', new BooleanFormItem(isInvalid));

    this.addItem('version', new TextFormItem(version));
  }
}
