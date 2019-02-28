import is from 'is_js';
import { sprintf } from 'sprintf-js';
import { isExpectLength } from '@/helpers/validators';

const createLengthValidator = (prop) => {
  if (is.undefined(prop.max)) {
    throw new Error(
      '[formItemMixin] Length Validator must not be max properties',
    );
  }
  let message = null;
  if (is.not.undefined(prop.max) && is.not.undefined(prop.min)) {
    message = sprintf('%(min)s-%(max)s文字で入力してください', prop);
  } else {
    message = sprintf('%(max)s文字以内で入力してください', prop);
  }
  return {
    message,
    validator: value => isExpectLength(value, prop),
  };
};

export default createLengthValidator;
