import '../firebase/firebaseconfig.js';
import { componentHeader } from '../pages-components/components-js/header.js';
import { componentFooter } from '../pages-components/components-js/footer.js';

export default () => {
  const containerHome = document.createElement('header');
  const templateHome = `
  <h1 class='home-title'>Bem-Vindo ao Eco Work Planet</h1>
  <div class='home-main'>
    <div id='container-video'>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/0cYiZ_EOIiY?autoplay=1&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
    </iframe>
    </div>
    <a href='#login' class='link-pages'>Login</a><br />
    <a href='#register' class='link-pages'>Cadastro</a><br />
    <a href='#about' class='link-pages'>Sobre</a><br />
  </div>
  `;

  containerHome.appendChild(componentHeader());
  containerHome.innerHTML += templateHome;
  containerHome.appendChild(componentFooter());

  return containerHome;
};
