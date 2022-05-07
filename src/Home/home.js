import '../firebase/firebaseconfig.js';
import { componentHeader } from '../pages-components/components-js/header.js';
import { componentFooter } from '../pages-components/components-js/footer.js';

export default () => {
  const containerHome = document.createElement('header');
  const templateHome = `
  <h1 class='home-title'>Bem-Vindo ao Eco Work Planet</h1>
  <div class='home-main'>
  
    <a href="#login" class='link-pages'>Login</a><br>
    <a href="#register" class='link-pages'>Cadastro</a><br>
    <a href="#about" class='link-pages'>Sobre a aplicação</a><br>
    </div>
  `;

  containerHome.appendChild(componentHeader());
  containerHome.innerHTML += templateHome;
  containerHome.appendChild(componentFooter());

  return containerHome;
};
