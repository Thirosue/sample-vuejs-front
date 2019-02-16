import is from 'is_js'

export const isEmptyString = value => {
  return String(value).length === 0;
};

export const isTel = value => {
  const tel = value.replace(/[━.*‐.*―.*－.*\-.*ー.*\-]/gi,'');
  return tel.match(/^(0[5-9]0[0-9]{8}|0[1-9][1-9][0-9]{7})$/);
};

export const isEmail = value => {
  return is.email(value);
};

export const isExpectLength = (value, { max = Infinity, min = 0 } = {}) => {
  const str = String(value);
  if (str.length > max) {
    return false;
  }
  if (str.length < min) {
    return false;
  }
  return true;
};
