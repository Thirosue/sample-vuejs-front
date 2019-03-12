import { createObj } from '@/helpers';

describe('createObj', () => {
  it('文字列を指定した場合、null が返る', () => {
    expect(createObj('hoge')).toEqual(null);
  });

  it('empty を指定した場合、undefined が返る', () => {
    expect(createObj('')).toEqual(undefined);
  });

  it('数値を指定した場合、数値が返る', () => {
    expect(createObj('1')).toEqual(1);
  });

  it('{hoge: 1} を指定した場合、指定したオブジェクトが返る', () => {
    expect(createObj('{hoge: 1}')).toEqual({ hoge: 1 });
  });

  it('{hoge: 1, fuga: [1,2] } をした場合、指定したオブジェクトが返る', () => {
    expect(createObj('{hoge: 1, fuga: [1,2] }')).toEqual({ hoge: 1, fuga: [1, 2] });
  });
});
