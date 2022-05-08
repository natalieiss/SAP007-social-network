import '../firebase/firebaseconfig.js';
import about from '../about/about.js';
import home from '../Home/home.js';
import { register } from '../register/register.js';
import { login } from '../login/login.js';
import { timeline } from '../feed/feed.js';
import { stateVerification } from '../firebase/firebaseauth.js';

const main = document.querySelector('#root');
const render = () => {
  switch (window.location.hash) {
    case '#home':
      main.appendChild(home());
      break;
    case '#about':
      main.appendChild(about());
      break;
    case '#register':
      main.appendChild(register());
      break;
    case '#login':
      main.appendChild(login());
      break;
    case '#timeline':
      stateVerification((logado) => {
        if (logado === true) {
          main.appendChild(timeline());
        } else window.location.hash = '#login';
      });
      break;
    default:
      main.appendChild(home());
  }
};
window.addEventListener('hashchange', () => {
  main.innerHTML = '';
  render();
});

window.addEventListener('load', () => {
  render();
});
