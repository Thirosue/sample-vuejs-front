import { BaseFormItem } from '@/lib';
// import { isFlag } from '@/helpers/validators';

export default class FlagFormItem extends BaseFormItem {
  constructor(value = '') {
    super(value);

    // this._addValidators();
  }

  // _addValidators() {
  //   this.addValidator({
  //     message: '不正な操作が行われました',
  //     validator: isFlag,
  //   });
  // }
}
