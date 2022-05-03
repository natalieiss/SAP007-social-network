/* eslint-disable jest/no-identical-title */
/*
 * @jest-environment jsdom
 */

import { creatNewUser } from '../src/firebase/firebaseauth.js';
import { register } from '../src/register/register.js';
// import { login } from '../login/login.js';

jest.mock('../src/firebase/exports.js');
jest.mock('../src/firebase/authentication.js');

describe('creatNewUser', () => {
  it('Deverá ser uma função', () => {
    expect(typeof creatNewUser).toBe('function');
  });
});

describe('creatNewUser', () => {
  it('Deverá cadastrar corretamente', () => {
    creatNewUser.mockResolvedValueOnce();
    const email = 'somais@umsilva.com';
    const password = '123456';
    const pageRegister = register();
    const emailInformed = pageRegister.querySelector('.email');
    const passwordInformed = pageRegister.querySelector('.password');
    const btnRegister = pageRegister.querySelector('#btn-register');
    emailInformed.value = email;
    passwordInformed.value = password;
    btnRegister.dispatchEvent(new Event('click')); // aconteceu um novo evento

    expect(creatNewUser).toHaveBeenCalledWith(email, password);
    expect(creatNewUser).toHaveBeenCalledTimes(1);
  });
});
