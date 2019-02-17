import is from 'is_js'
import { Config } from '@/conf/config';
import { TextFormItem, RowsFormItem } from '@/forms/items';

export const set = (form, rows, page) => {
  form.addItem('rows', new RowsFormItem(is.empty(rows) ? Config.DEFAULT_ROWS : rows));
  form.addItem('page', new TextFormItem(is.empty(page) ? '1' : page));
  return form;
};
