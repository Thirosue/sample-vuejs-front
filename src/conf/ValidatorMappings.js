import is from 'is_js';
import { createObj } from '@/helpers/object';
import * as ValidatorSettings from '@/helpers/validator';
import { isNotEmpty } from '@/helpers/validators';

const _SimpleValidatorMappings = [
  { key: 'required', validator: isNotEmpty, message: '入力が必須の項目です' },
];

const _CustomValidatorMappings = [
  { key: 'range', create: ValidatorSettings.createLengthValidator },
];

const _getSimpleValidator = key => _SimpleValidatorMappings.find(mapping => mapping.key === key);
const _getCostomValidator = key => _CustomValidatorMappings.find(mapping => mapping.key === key);

export const setValidator = (formItem, rule, prop) => {
  const _simpeValidator = _getSimpleValidator(rule);
  if (_simpeValidator) {
    formItem.addValidator({
      message: _simpeValidator.message,
      validator: _simpeValidator.validator,
    });
  }

  const _costomValidator = _getCostomValidator(rule);
  if (_costomValidator) {
    const _prop = createObj(prop);
    const _validator = _costomValidator.create.call(null, _prop);
    formItem.addValidator(_validator);
  }
};
