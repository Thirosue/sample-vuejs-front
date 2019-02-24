import is from 'is_js';

export const isEmpty = value => {
  return is.empty(value) || is.null(value) || is.undefined(value);
}

export const isNotEmpty = value => {
  return !(is.empty(value) || is.null(value) || is.undefined(value));
}