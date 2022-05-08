/*
 @jest-environment jsdom
 */

import { signInPassword } from '../src/firebase/firebaseauth.js';
import { login } from '../src/login/login.js';

jest.mock('../src/firebase/firebaseauth.js');
jest.mock('../src/firebase/export.js');

describe('signInPassword,', () => {
  it('should be a function', () => {
    expect(typeof signInPassword).toBe('function');
  });
});

describe('signInPassword', () => {
  beforeEach(() => {
    signInPassword.mockClear();
  });
  it('should login with e-mail and password', () => {
    signInPassword.mockResolvedValueOnce();
    const email = 'somais@umsilva.com';
    const password = '123456';
    const containerLogin = login();
    const emailInformed = containerLogin.querySelector('.email-input');
    const passwordInformed = containerLogin.querySelector('.password-input');
    const form = containerLogin.querySelector('.form-login');

    emailInformed.value = email;
    passwordInformed.value = password;
    form.submit();

    expect(signInPassword).toHaveBeenCalledWith(email, password);
    expect(signInPassword).toHaveBeenCalledTimes(1);
  });
  it('should display the error user not registered', async () => {
    const erro = {
      code: 'auth/user-not-found',
    };
    signInPassword.mockRejectedValueOnce(erro);
    const email = 'teste@umsilva.com';
    const password = '123456';
    const containerLogin = login();
    const emailInformed = containerLogin.querySelector('.email-input');
    const passwordInformed = containerLogin.querySelector('.password-input');
    const error = containerLogin.querySelector('.error-login');
    const form = containerLogin.querySelector('.form-login');

    emailInformed.value = email;
    passwordInformed.value = password;
    form.submit();
    await new Promise(process.nextTick);
    expect(signInPassword).toHaveBeenCalledWith(email, password);
    expect(error.innerHTML).toEqual('Usuário não cadastrado, registre-se!');
    expect(signInPassword).toHaveBeenCalledTimes(1);
  });

  it('should show an error when the errors are empty', async () => {
    const erro = {
      code: 'auth/internal-error',
    };
    signInPassword.mockRejectedValueOnce(erro);
    const email = '';
    const password = '';
    const containerLogin = login();
    const emailInformed = containerLogin.querySelector('.email-input');
    const passwordInformed = containerLogin.querySelector('.password-input');
    const error = containerLogin.querySelector('.error-login');
    const form = containerLogin.querySelector('.form-login');

    emailInformed.value = email;
    passwordInformed.value = password;
    form.submit();
    await new Promise(process.nextTick);
    expect(signInPassword).toHaveBeenCalledWith(email, password);
    expect(error.innerHTML).toEqual('Campos obrigatórios!');
    expect(signInPassword).toHaveBeenCalledTimes(1);
  });
  it('should show an error when email or password is incorrect', async () => {
    const erro = {
      code: 'auth/wrong-password',
    };
    signInPassword.mockRejectedValueOnce(erro);
    const email = 'teste@umsilva.com';
    const password = '5326453';
    const containerLogin = login();
    const emailInformed = containerLogin.querySelector('.email-input');
    const passwordInformed = containerLogin.querySelector('.password-input');
    const error = containerLogin.querySelector('.error-login');
    const form = containerLogin.querySelector('.form-login');

    emailInformed.value = email;
    passwordInformed.value = password;
    form.submit();
    await new Promise(process.nextTick);
    expect(signInPassword).toHaveBeenCalledWith(email, password);
    expect(error.innerHTML).toEqual('E-mail ou senha não são válidos!');
    expect(signInPassword).toHaveBeenCalledTimes(1);
  });
});
