/*
 @jest-environment jsdom
 */

import { createNewUser } from '../src/firebase/firebaseauth.js';
import { register } from '../src/register/register.js';

jest.mock('../src/firebase/firebaseauth.js');
jest.mock('../src/firebase/export.js');

describe('creaeteNewUser', () => {
  it('Deverá ser uma função', () => {
    expect(typeof createNewUser).toBe('function');
  });
});

// eslint-disable-next-line jest/no-identical-title
describe('createNewUser', () => {
  beforeEach(() => {
    createNewUser.mockClear();
  });
  it('Should correctly register the user', () => {
    createNewUser.mockResolvedValueOnce();
    const email = 'somais@umsilva.com';
    const password = '123456';
    const containerRegister = register();
    const emailInformed = containerRegister.querySelector('.email');
    const passwordInformed = containerRegister.querySelector('.password');
    const check = containerRegister.querySelector('#check');
    const form = containerRegister.querySelector('.form-register');

    emailInformed.value = email;
    passwordInformed.value = password;
    check.checked = true;
    form.submit();

    expect(createNewUser).toHaveBeenCalledWith(email, password);
    expect(createNewUser).toHaveBeenCalledTimes(1);
  });
  it('should receive a Password error with less than 6 digits', async () => {
    const erro = {
      code: 'auth/weak-password',
    };
    createNewUser.mockRejectedValueOnce(erro);
    const email = 'somais@umsilva.com';
    const password = '1234';
    const containerRegister = register();
    const emailInformed = containerRegister.querySelector('.email');
    const passwordInformed = containerRegister.querySelector('.password');
    const check = containerRegister.querySelector('#check');
    const error = containerRegister.querySelector('#erro-message');
    const form = containerRegister.querySelector('.form-register');

    emailInformed.value = email;
    passwordInformed.value = password;
    check.checked = true;
    form.submit();
    await new Promise(process.nextTick);
    expect(createNewUser).toHaveBeenCalledWith(email, password);
    expect(error.innerHTML).toEqual('Senha com menos de 6 Digitos');
    expect(createNewUser).toHaveBeenCalledTimes(1);
  });
  it('should receive another E-mail error in use', async () => {
    const erro = {
      code: 'auth/email-already-in-use',
    };
    createNewUser.mockRejectedValueOnce(erro);
    const email = 'somais@umsilva.com';
    const password = '123456';
    const containerRegister = register();
    const emailInformed = containerRegister.querySelector('.email');
    const passwordInformed = containerRegister.querySelector('.password');
    const check = containerRegister.querySelector('#check');
    const error = containerRegister.querySelector('#erro-message');
    const form = containerRegister.querySelector('.form-register');

    emailInformed.value = email;
    passwordInformed.value = password;
    check.checked = true;
    form.submit();
    await new Promise(process.nextTick);
    expect(createNewUser).toHaveBeenCalledWith(email, password);
    expect(error.innerHTML).toEqual('E-mail em uso');
    expect(createNewUser).toHaveBeenCalledTimes(1);
  });
  it('should get one when the terms are not accepted', async () => {
    const erro = {
      code: 'auth/internal-error',
    };
    createNewUser.mockRejectedValueOnce(erro);
    const email = 'somais@umsilva.com';
    const password = '123456';
    const containerRegister = register();
    const emailInformed = containerRegister.querySelector('.email');
    const passwordInformed = containerRegister.querySelector('.password');
    const check = containerRegister.querySelector('#check');
    const error = containerRegister.querySelector('#erro-message');
    const form = containerRegister.querySelector('.form-register');

    emailInformed.value = email;
    passwordInformed.value = password;
    check.checked = false;
    form.submit();
    await new Promise(process.nextTick);
    expect(createNewUser).toHaveBeenCalledWith(email, password);
    expect(error.innerHTML).toEqual('E-mail em uso');
    expect(createNewUser).toHaveBeenCalledTimes(1);
  });
});
