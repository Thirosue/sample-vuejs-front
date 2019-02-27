import _ from 'lodash';

/*
 * {key1:'val1', key2: 'val2'}, ['key1','replase1'] => {replace1: 'val1'}
 * {key1:'val1', key2: 'val2'}, ['key1','replase1'], ['key2','replase2'] => {replace1:'val1', replace2:'val2'}
 */
export const convertKeys = (obj, ...targets) => Object.entries(obj)
  .filter(([name, val]) => targets.map(target => target[0]).includes(name))
  .reduce(
    (o, [name, val]) => ({ ...o, [_.head(targets.filter(target => target[0] === name))[1]]: val }),
    {},
  );
