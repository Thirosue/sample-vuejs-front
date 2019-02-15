import { BaseForm } from '@/lib';
import { SearchFormItem, SortFormItem } from '@/forms/items';
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
    this.addItem('firstName', new SearchFormItem(firstName));
    this.addItem('lastName', new SearchFormItem(lastName));
    this.addItem('email', new SearchFormItem(email));
    this.addItem('tel', new SearchFormItem(tel));

    //for list search
    set(this, rows, page);
    this.addItem('sort', new SortFormItem(sort, getSortList(ListSettings.StaffListSettings)));
  }
}
