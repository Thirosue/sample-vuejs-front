import { isEmpty } from '@/helpers/is';

export const decode = ( code, options ) => {
  if(isEmpty(code)) return ''
  return options.find(option=>option.value===code).text
};