/*
 @jest-environment jsdom
 */

import { createNewUser } from '../src/firebase/firebaseauth.js';
import { register } from '../src/register/register.js';

jest.mock('../src/firebase/firebaseauth.js');
jest.mock('../src/firebase/export.js');

describe('creaeteNewUser', () => {
  it('should be a function', () => {
    expect(typeof createNewUser).toBe('function');
  });
});

// eslint-disable-next-line jest/no-identical-title
describe('createNewUser', () => {
  beforeEach(() => {
    createNewUser.mockClear();
  });
  it('should correctly register the user', () => {
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
  it('should get an error when the password is less than 6 digits', async () => {
    const erroRegister = {
      code: 'auth/weak-password',
    };
    createNewUser.mockRejectedValueOnce(erroRegister);
    const email = 'somais@umsilva.com';
    const password = '12345';
    const containerRegister = register();
    const emailInformed = containerRegister.querySelector('.email');
    const passwordInformed = containerRegister.querySelector('.password');
    const check = containerRegister.querySelector('#check');
    const error = containerRegister.querySelector('#error-message');
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
  it('should receive an error E-mail in use ', async () => {
    const erroRegister = {
      code: 'auth/email-already-in-use',
    };
    createNewUser.mockRejectedValueOnce(erroRegister);
    const email = 'somais@umsilva.com';
    const password = '123456';
    const containerRegister = register();
    const emailInformed = containerRegister.querySelector('.email');
    const passwordInformed = containerRegister.querySelector('.password');
    const check = containerRegister.querySelector('#check');
    const error = containerRegister.querySelector('#error-message');
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
});
