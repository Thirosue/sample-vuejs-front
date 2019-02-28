import { buildPath } from '@/helpers/path';

describe('buildPath', () => {
  it('UserList Path', () => {
    expect(buildPath('user').LIST).toBe('/userList');
  });

  it('UserDetail Path', () => {
    expect(buildPath('user').DETAIL).toBe('/user');
  });

  it('UserEdit Path', () => {
    expect(buildPath('user').EDIT).toBe('/userEdit');
  });

  it('UserEditComplete Path', () => {
    expect(buildPath('user').EDIT_COMPLETE).toBe('/userEditComplete');
  });

  it('UserRegister Path', () => {
    expect(buildPath('user').REGISTER).toBe('/userRegister');
  });

  it('UserRegisterComplete Path', () => {
    expect(buildPath('user').REGISTER_COMPLETE).toBe('/userRegisterComplete');
  });

  it('Undefined Path', () => {
    expect(buildPath('user').HOGE).toBe(undefined);
  });
});
