export const PATH_LIST = {
  LIST: 'List',
  DETAIL: '',
  EDIT: 'Edit',
  EDIT_COMPLETE: 'EditComplete',
  REGISTER: 'Register',
  REGISTER_COMPLETE: 'RegisterComplete',
};

export const buildPath = namespace => Object.entries(PATH_LIST).reduce((pathMapping, [type, value]) => {
  pathMapping[type] = `/${namespace}${value}`;
  return pathMapping;
}, {});
