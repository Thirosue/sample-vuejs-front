/*
 * JSON.parseできない {hoge: 1} とかに対応
 */

/* eslint no-new-func: "off" */
const createObj = (str) => {
  try {
    return (new Function(`return ${str}`))();
  } catch {
    return null;
  }
};

export { createObj as default };
