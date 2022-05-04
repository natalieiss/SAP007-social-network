/*
 @jest-environment jsdom
 */

import { creatNewUser } from '../src/firebase/firebaseauth.js';
import { register } from '../src/register/register.js';

jest.mock('../src/firebase/firebaseauth.js');
jest.mock('../src/firebase/export.js');

describe('creatNewUser', () => {
  it('Deverá ser uma função', () => {
    expect(typeof creatNewUser).toBe('function');
  });
});

// eslint-disable-next-line jest/no-identical-title
describe('creatNewUser', () => {
  it('Deverá cadastrar corretamente o usuário', () => {
    creatNewUser.mockResolvedValueOnce();
    const email = 'somais@umsilva.com';
    const password = '123456';
    const containerRegister = register();
    const emailInformed = containerRegister.querySelector('.email');
    const passwordInformed = containerRegister.querySelector('.password');
    const check = containerRegister.querySelector('#check');
    const form = containerRegister.querySelector('.form-login');

    emailInformed.value = email;
    passwordInformed.value = password;
    check.checked = true;
    form.submit();

    expect(creatNewUser).toHaveBeenCalledWith(email, password);
    expect(creatNewUser).toHaveBeenCalledTimes(1);
  });
});
