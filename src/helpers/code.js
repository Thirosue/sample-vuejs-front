import { isEmpty } from '@/helpers/validators';

const decode = (code, options) => {
  if (isEmpty(code)) return '';
  return options.find(option => option.value === code).text;
};

export { decode as default };
