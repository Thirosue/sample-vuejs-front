/*
 * JSON.parseできない {hoge: 1} とかに対応
 */
export const createObj = str => (new Function("return " + str))();