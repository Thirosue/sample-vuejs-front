import { convertKeys } from '@/helpers';

describe('convertKeys', () => {
  const beforeObj = {
    key1: 'val1',
    key2: 'val2',
    key3: 'val3',
    key4: 'val4',
    key5: 'val5',
  };

  it('1つの変換キー指定で正常に変換される', () => {
    expect(convertKeys(beforeObj, ['key1', 'replace1'])).toEqual({
      replace1: 'val1',
    });
  });

  it('3つの変換キー指定で正常に変換される', () => {
    expect(convertKeys(beforeObj, ['key1', 'replace1'], ['key2', 'replace2'], ['key3', 'replace3'])).toEqual({
      replace1: 'val1',
      replace2: 'val2',
      replace3: 'val3',
    });
  });

  it('3つの変換キー指定（内1つはヒットしない）で正常に変換される', () => {
    expect(convertKeys(beforeObj, ['key1', 'replace1'], ['key2', 'replace2'], ['hoge3', 'replace3'])).toEqual({
      replace1: 'val1',
      replace2: 'val2',
    });
  });

  it('3つの変換キー指定（全てヒットしない）で空オブジェクトが返る', () => {
    expect(convertKeys(beforeObj, ['hoge1', 'replace1'], ['hoge2', 'replace2'], ['hoge3', 'replace3'])).toEqual({});
  });

  it('引数なしで空オブジェクトが返る', () => {
    expect(convertKeys(beforeObj)).toEqual({});
  });
});
