import { convertKeys } from '@/helpers/form';

describe('convertKeys', () => {
  const beforeObj = {
    key1: 'val1',
    key2: 'val2',
    key3: 'val3',
    key4: 'val4',
    key5: 'val5',
  };

  it('Convert 1 keys', () => {
    expect(convertKeys(beforeObj, ['key1', 'replace1'])).toEqual({
      replace1: 'val1',
    });
  });

  it('Convert 3 keys all hit', () => {
    expect(convertKeys(beforeObj, ['key1', 'replace1'], ['key2', 'replace2'], ['key3', 'replace3'])).toEqual({
      replace1: 'val1',
      replace2: 'val2',
      replace3: 'val3',
    });
  });

  it('Convert 3 keys 2 hit', () => {
    expect(convertKeys(beforeObj, ['key1', 'replace1'], ['key2', 'replace2'], ['hoge3', 'replace3'])).toEqual({
      replace1: 'val1',
      replace2: 'val2',
    });
  });

  it('Convert 3 keys 0 hit', () => {
    expect(convertKeys(beforeObj, ['hoge1', 'replace1'], ['hoge2', 'replace2'], ['hoge3', 'replace3'])).toEqual({});
  });

  it('Convert no keys', () => {
    expect(convertKeys(beforeObj)).toEqual({});
  });
});
