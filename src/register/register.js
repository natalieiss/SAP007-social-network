import '../firebase/firebaseconfig.js';
import { creatNewUser } from '../firebase/firebaseauth.js';
import { componentHeader } from '../pages-components/components-js/header.js';
import { componentFooter } from '../pages-components/components-js/footer.js';

export const register = () => {
  const containerRegister = document.createElement('div');
  containerRegister.setAttribute('class', 'container');
  const templateRegister = `
  <h1>Cadastro</h1>
    <div id="erro">
      <p id="MenssagemDeErro"></p>
    </div>
    <form class='form-login'>
      <input type='email' name='email' class='email' placeholder='Insera e-mail' autocomplet required />
      <input type='password' name='password' class='password' placeholder='Insera uma senha' requerid /><br>
      <button type='submit' id='btn-register'>Cadastrar</button><br>
      <a href='#login'> Já possui conta?</a><br>
      <section id='termsUse'>
        <h1>Termos de uso</h1>
        <div id='paragraph'>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown printer to....Lorem Ipsum is simply
            dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer to....</p>
        </div>
        <label value=''>Concordo com os
          termos de uso</label>
        <input id='check' type='checkbox' name='checkbox' />
      </section>
    </form>
 `;
  containerRegister.appendChild(componentHeader());

  containerRegister.innerHTML += templateRegister;

  containerRegister.appendChild(componentFooter());

  const email = containerRegister.querySelector('.email');
  const password = containerRegister.querySelector('.password');
  const checkbox = containerRegister.querySelector('#check');

  containerRegister.addEventListener('submit', (e) => {
    e.preventDefault();
    if (checkbox.checked) {
      creatNewUser(email.value, password.value)
        .then(() => {
          window.location.hash = '#timeline';
        })
        .catch((error) => {
          const Termos = containerRegister.querySelector('#MenssagemDeErro');
          const errorCode = error.code;
          switch (errorCode) {
            case 'auth/weak-password':
              Termos.innerHTML = 'Senha com menos de 6 Digitos';

              break;
            case 'auth/email-already-in-use':
              Termos.innerHTML = 'E-mail em uso';

              break;
            default:
          }
        });
    } else {
      const Termos = containerRegister.querySelector('#MenssagemDeErro');
      Termos.innerHTML = 'Aceite os termos de uso';
    }
  });
  return containerRegister;
};
