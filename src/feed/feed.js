import '../firebase/firebaseconfig.js';
import { addPosts, getPosts } from '../firebase/firestoreauth.js';
import { structuresPost } from '../pages-components/components-js/post.js';
import { sair, authentication } from '../firebase/firebaseauth.js';
import { componentHeader } from '../pages-components/components-js/header.js'; // importando componente de cabeçalho
import { componentFooter } from '../pages-components/components-js/footer.js';

export const timeline = () => {
  const feed = document.createElement('div');

  const templateFeed = `
 
  <main class='container-geral'>
  <div> <button id='btn-logout' class='btn-logout'>sair</button></div>
  <span id="feedback" class='feedback'></span>
    <div class='area-post'>
      <textarea  class='message'  maxlength='300' rows='10' placeholder='o que você está pensando?'></textarea>
      </div>
      <div class='btn-publicar'>
      <button  id='btn-post' class='btn-post'>Postar</button>
      </div>
    <div class='posts'>
    <div  id='new-post' class='new-post'></div>
    <div  id='all-posts' class='all-posts'></div>
    </div'>
    </main>
  `;

  feed.appendChild(componentHeader());
  feed.innerHTML += templateFeed;
  feed.appendChild(componentFooter());

  const link = document.getElementById('stylePages');
  link.href = 'feed/feed.css';
  const logout = feed.querySelector('.btn-logout'); // botão para sair
  const message = feed.querySelector('.message'); // pegando menssagem do user
  const btnPost = feed.querySelector('.btn-post'); // botão de publicar
  const newPosts = feed.querySelector('.new-post'); //  novos posts e colocar na lista
  const feedbackError = feed.querySelector('#feedback');

  btnPost.addEventListener('click', async (e) => {
    e.preventDefault();
    // eslint-disable-next-line max-len
    const errorMessage = message.value; // avisar o usuário de que ele deve preencher os campos/ não deixar postar vazio
    if (errorMessage === '' || !errorMessage) {
      feedbackError.classList.add('error');
      feedbackError.innerHTML = 'Campos obrigatórios!';
    } else {
      addPosts(errorMessage, authentication.currentUser.email).then((id) => {
        // functicon pronta
        const date = new Date().toLocaleString('pt-br'); // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
        const item = {
          userEmail: authentication.currentUser.email, // para saber qual e-mail está postando
          message: message.value, // pega valor da menssagem
          date, // o horario e data
          id,
          likes: [],
        };
        newPosts.prepend(structuresPost(item)); // https://www.youtube.com/watch?v=mAfeyy2bLzI
        message.value = '';
        feedbackError.innerHTML = '';
      });
    }
  });
  const divAllPosts = feed.querySelector('.all-posts');

  const showingAllPosts = async () => {
    const allPosts = await getPosts();
    allPosts.forEach((item) => {
      const infoOfPots = structuresPost(item);
      divAllPosts.prepend(infoOfPots);
    });
  };
  // função para o pessoa sair
  logout.addEventListener('click', (e) => {
    e.preventDefault();
    sair().then(() => {
      window.location.hash = '';
    });
  });

  showingAllPosts();
  return feed;
};
