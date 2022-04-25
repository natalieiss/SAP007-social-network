import '../firebase/firebaseconfig.js';
import { componentHeader } from '../pages-components/components-js/header.js';

export default () => {
  const containerHome = document.createElement('div');
  const templateHome = `
  <h1 class='home-title'>Bem-Vindo ao Eco Work Planet</h1>
  <div class='home-main'>
     <video src="img/teste.mkv"></video>
    <a href="#login" class='link-pages'>Login</a><br>
    <a href="#register" class='link-pages'>Cadastro</a><br>
    <a href="#about" class='link-pages'>Sobre</a><br>
    </div>
  `;

  containerHome.appendChild(componentHeader());
  containerHome.innerHTML += templateHome;

  const link = document.getElementById('stylePages');
  link.href = 'Home/home.Css';

  return containerHome;
};
