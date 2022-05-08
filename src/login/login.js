import '../firebase/firebaseconfig.js';
import { signInPassword, googleLogin } from '../firebase/firebaseauth.js';
import { componentHeader } from '../pages-components/components-js/header.js';
import { componentFooter } from '../pages-components/components-js/footer.js';

export const login = () => {
  const containerLogin = document.createElement('div');
  containerLogin.setAttribute('class', 'container-login');
  const templateLogin = `
  <form class="form-login">
  <p class='paragraph'>Login</p>
  <span class='error-login'></span>
  <input type="email" name="email" class="email-input input-users" placeholder="Preencha com o e-mail" autocomplete required /><br>
  <input type="password" name="password" class="password-input input-users" placeholder="Preencha com a senha" required /><br>
  <button class='btn-submit' type="submit">Entrar</button><br>
  <button class="btn-google"><img src="img/google.png" alt="botão Google">Efetuar login com o Google
  </button><br>
</form>
</section>
 <a href="#register"> <p class ='signup'>Clique aqui para se cadastrar</p></a> 
  
  `;
  containerLogin.appendChild(componentHeader());
  containerLogin.innerHTML += templateLogin;
  containerLogin.appendChild(componentFooter());

  const email = containerLogin.querySelector('.email-input');
  const password = containerLogin.querySelector('.password-input');
  const google = containerLogin.querySelector('.btn-google');
  const errorLogin = containerLogin.querySelector('.error-login');

  containerLogin.addEventListener(
    'submit',
    (e) => {
      e.preventDefault();
      signInPassword(email.value, password.value)
        .then(() => {
          window.location.hash = '#timeline';
        })
        .catch((error) => {
          if (error.code === 'auth/internal-error') {
            errorLogin.innerHTML = 'Campos obrigatórios!';
            errorLogin.style.display = 'block';
          } else if (error.code === 'auth/wrong-password') {
            errorLogin.innerHTML = 'E-mail ou senha não são válidos!';
            errorLogin.style.display = 'block';
          } else if (error.code === 'auth/user-not-found') {
            errorLogin.innerHTML = 'Usuário não cadastrado, registre-se!';
            errorLogin.style.display = 'block';
          }
          const errorMessage = error.message;
          return errorMessage;
        });
    },

    google.addEventListener('click', (e) => {
      e.preventDefault();
      googleLogin().then(() => {
        window.location.hash = '#timeline';
      });
    })
  );
  return containerLogin;
};
