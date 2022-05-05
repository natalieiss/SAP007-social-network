/*
 @jest-environment jsdom
 */

import { creatNewUser, googleLogin } from '../src/firebase/firebaseauth.js';
import { register } from '../src/register/register.js';
import { login } from '../src/login/login.js'

jest.mock('../src/firebase/firebaseauth.js');
jest.mock('../src/firebase/export.js');

describe('creatNewUser', () => {
  it('Deverá ser uma função', () => {
    expect(typeof creatNewUser).toBe('function');
  });
});

// eslint-disable-next-line jest/no-identical-title
describe('creatNewUser', () => {
  it('Deverá cadastrar corretamente', () => {
    creatNewUser.mockResolvedValueOnce();
    const email = 'somais@umsilva.com';
    const password = '123456';
    const containerRegister = register();
    const emailInformed = containerRegister.querySelector('.email');
    const passwordInformed = containerRegister.querySelector('.password');
    const btnRegister = containerRegister.querySelector('#btn-register');
    emailInformed.value = email;
    passwordInformed.value = password;
    btnRegister.dispatchEvent(new Event('click')); // aconteceu um novo evento

    expect(creatNewUser).toHaveBeenCalledWith(email, password);
  });
});

describe('googleLogin', () => {
  it('Deverá ser uma função', () => {
    expect(typeof googleLogin).toBe('function');
  });
});

describe('googleLogin', () => {
  it('Deverá efetuar o login através do Google corretamente', () => {
    googleLogin.mockResolvedValueOnce();
    const containerLogin = login();
    const btnGoogle = containerLogin.querySelector('.btn-google')
    btnGoogle.dispatchEvent(new Event('click'))
    expect(googleLogin).toHaveBeenCalledWith() //o que colocar?

  })
})

