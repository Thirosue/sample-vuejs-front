import is from 'is_js'
import { Config } from '@/conf/config';
import { RowsFormItem } from '@/forms/items';
import { SearchFormItem } from '@/forms/items';

export const set = (form, rows, page) => {
  form.addItem('rows', new RowsFormItem(is.empty(rows) ? Config.DEFAULT_ROWS : rows));
  form.addItem('page', new SearchFormItem(is.empty(page) ? '1' : page));
  return form;
};
