import { BaseForm } from '@/lib';
import { TextFormItem, SortFormItem } from '@/forms/items';
import { set } from '@/helpers/list';
import { getSortList } from '@/helpers/sort';
import ListSettings from '@/conf/ListSettings';

export class StaffSearchForm extends BaseForm {
  constructor({
    firstName = '',
    lastName = '',
    email = '',
    tel = '',
    rows = '',
    page = '',
    sort = '',
  } = {}) {
    super();
    this.addItem('firstName', new TextFormItem(firstName));
    this.addItem('lastName', new TextFormItem(lastName));
    this.addItem('email', new TextFormItem(email));
    this.addItem('tel', new TextFormItem(tel));

    // for list search
    set(this, rows, page);
    this.addItem('sort', new SortFormItem(sort, getSortList(ListSettings.StaffListSettings)));
  }
}
