import { createObj } from '@/helpers';

describe('createObj', () => {
  it('hoge', () => {
    expect(createObj('hoge')).toEqual(null);
  });

  it('', () => {
    expect(createObj('')).toEqual(undefined);
  });

  it('1', () => {
    expect(createObj('1')).toEqual(1);
  });

  it('{hoge: 1}', () => {
    expect(createObj('{hoge: 1}')).toEqual({ hoge: 1 });
  });

  it('{hoge: 1, fuga: [1,2] }', () => {
    expect(createObj('{hoge: 1, fuga: [1,2] }')).toEqual({ hoge: 1, fuga: [1, 2] });
  });
});
