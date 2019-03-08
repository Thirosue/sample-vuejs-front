import _ from 'lodash';

const getSortList = (mapping) => {
  const ascList = mapping.filter(row => row.sort).map((row) => {
    const value = [row.key, 'asc'].join(' ');
    const text = [row.value, '昇順'].join(' ');
    const order = row.order + 0.1;
    return { text, value, order };
  });
  const descList = mapping.filter(row => row.sort).map((row) => {
    const value = [row.key, 'desc'].join(' ');
    const text = [row.value, '降順'].join(' ');
    const order = row.order + 0.2;
    return { text, value, order };
  });
  return _.orderBy(_.concat(ascList, descList), 'order');
};

export default { getSortList };
