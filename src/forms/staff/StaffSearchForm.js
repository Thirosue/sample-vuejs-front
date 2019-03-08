import Config from '@/conf/Config';
import { BaseForm } from '@/lib';
import { TextFormItem, SortFormItem, RowsFormItem } from '@/forms/items';
import { getSortList } from '@/helpers';
import ListSettings from '@/conf/ListSettings';

export default class StaffSearchForm extends BaseForm {
  constructor({
    firstName = '',
    lastName = '',
    email = '',
    tel = '',
    rows = Config.DEFAULT_ROWS,
    page = '1',
    sort = '',
  } = {}) {
    super();
    this.addItem('firstName', new TextFormItem(firstName));
    this.addItem('lastName', new TextFormItem(lastName));
    this.addItem('email', new TextFormItem(email));
    this.addItem('tel', new TextFormItem(tel));

    this.addItem('rows', new RowsFormItem(rows));
    this.addItem('page', new TextFormItem(page));
    this.addItem('sort', new SortFormItem(sort, getSortList(ListSettings.StaffListSettings)));
  }
}
