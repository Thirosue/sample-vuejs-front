import { createObj } from '@/helpers';
import ValidatorSettings from '@/helpers/validator';
import { isNotEmpty } from '@/helpers/validators';

export default class ValidatorMappings {
  static SimpleValidatorMappings = [
    { key: 'required', validator: isNotEmpty, message: '入力が必須の項目です' },
  ]

  static CustomValidatorMappings = [
    { key: 'range', create: ValidatorSettings.createLengthValidator },
  ]

  static getSimpleValidator(key) {
    return this.SimpleValidatorMappings.find(mapping => mapping.key === key);
  }

  static getCostomValidator(key) {
    return this.CustomValidatorMappings.find(mapping => mapping.key === key);
  }

  static setValidator = (formItem, rule, prop) => {
    const simpeValidator = this.getSimpleValidator(rule);
    if (simpeValidator) {
      formItem.addValidator({
        message: simpeValidator.message,
        validator: simpeValidator.validator,
      });
    }

    const costomValidator = this.getCostomValidator(rule);
    if (costomValidator) {
      const propObj = createObj(prop);
      const validator = costomValidator.create.call(null, propObj);
      formItem.addValidator(validator);
    }
  }
}
