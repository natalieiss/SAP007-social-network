import '../firebase/firebaseconfig.js';
import { addPosts, getPosts } from '../firebase/firestoreauth.js';
import { structuresPost } from '../pages-components/components-js/post.js';
import { goOut, authentication } from '../firebase/firebaseauth.js';
import { componentHeader } from '../pages-components/components-js/header.js';
import { componentFooter } from '../pages-components/components-js/footer.js';

export const timeline = () => {
  const feed = document.createElement('div');

  const templateFeed = `
 
  <main class='container-geral'>
  </section>
  <section id='perfil-section'><div id="info-user"><button id='btn-logout' class='btn-logout'>sair</button><a href='#about'></a></div></section>
  <span id="feedback" class='feedback'></span>
  <div id="post-and-profile">
    <section class='area-post'>
      <textarea  id="textpost"class='message'  maxlength='300' rows='10' placeholder='o que você está pensando?'></textarea> 
      <button  id='btn-post' class='btn-post'>Postar</button>
  </div>
      <div class='btn-publicar'>
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

  const logout = feed.querySelector('.btn-logout');
  const message = feed.querySelector('.message');
  const btnPost = feed.querySelector('.btn-post');
  const newPosts = feed.querySelector('.new-post');
  const logout = feed.querySelector('.btn-logout'); // botão para sair
  const message = feed.querySelector('.message'); // pegando menssagem do user
  const btnPost = feed.querySelector('.btn-post'); // botão de publicar
  const newPosts = feed.querySelector('.new-post'); //  novos posts e colocar na lista
  const feedbackError = feed.querySelector('#feedback');

  btnPost.addEventListener('click', async (e) => {
    e.preventDefault();
    // eslint-disable-next-line max-len
    const errorMessage = message.value; 
    if (errorMessage === '' || !errorMessage) {
      feedbackError.classList.add('error'); 
      feedbackError.innerHTML = 'Campos obrigatórios!';
    } else {
      addPosts(errorMessage, authentication.currentUser.email).then((id) => {
        // functicon pronta
        const date = new Date().toLocaleString('pt-br');
        const item = {
          userEmail: authentication.currentUser.email,
          message: message.value,
          date,
          id,
          likes: [],
        };
        newPosts.prepend(structuresPost(item));
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

  logout.addEventListener('click', (e) => {
    e.preventDefault();
    goOut().then(() => {
      window.location.hash = '';
    });
  });

  showingAllPosts();
  return feed;
};
