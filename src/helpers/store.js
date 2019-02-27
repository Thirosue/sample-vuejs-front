export const buildModuleTypes = ({ moduleName, types }) => Object.entries(types).reduce((exportTypes, [type, value]) => {
  exportTypes[type] = `${moduleName}/${value}`;
  return exportTypes;
}, {});
