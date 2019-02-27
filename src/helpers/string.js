export const include = (target, word) => word.indexOf(target) !== -1;
export const includeList = (targetList, word) => targetList.find(target => include(target, word));
