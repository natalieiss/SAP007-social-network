import '../firebase/firebaseconfig.js';
import { addPosts, getPosts } from '../firebase/firestoreconfig.js';
import { structuresPost } from '../pages-components/components-js/post.js';
import { sair, authentication } from '../firebase/firebaseauth.js';
import { componentHeader } from '../pages-components/components-js/header.js'; // importando componente de cabeçalho
import { componentFooter } from '../pages-components/components-js/footer.js';

export const timeline = () => {
  const feed = document.createElement('div');
  const templateFeed = `
  <body>
   <section>
    <div class='post' >
      <textarea type='text'  class='text-post'  maxlength='300' rows='10' placeholder='o que você está pensando?' required></textarea>
      <button  class='btn-post'>Postar</button>
    </div>
  
    <button class='btn-logout'>sair</button>
    <ul  id='new-post' class='new-post'></ul>
    <ul  id='all-post' class='all-posts'></ul>
   
  `;

  feed.appendChild(componentHeader());
  feed.innerHTML += templateFeed;
  feed.appendChild(componentFooter());

  const message = feed.querySelector('.text-post'); // pegando menssagem do user
  const btnPost = feed.querySelector('.btn-post'); // botão de publicar
  const usersPosts = feed.querySelector('.new-post'); //  novos posts e colocar na lista
  const logout = feed.querySelector('.btn-logout'); // botão para sair
  const link = document.getElementById('stylePages');
  link.href = 'feed/feed.css';

  btnPost.addEventListener('click', async (e) => {
    // pegar o click para printar o post na tela
    e.preventDefault();
    addPosts(message.value, authentication.currentUser.email).then((id) => {
      // functicon pronta
      const date = new Date().toLocaleString('pt-br'); // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
      const item = {
        userEmail: authentication.currentUser.email, // para saber qual e-mail está postando
        message: message.value, // pega valor da menssagem
        date, // o horario e data
        id,
      };
      usersPosts.prepend(structuresPost(item)); // https://www.youtube.com/watch?v=mAfeyy2bLzI
      message.value = '';
    });
  });
  const timelineSection = feed.querySelector('.all-posts'); // section guardar todos os posts

  const showingAllPosts = async () => {
    const allPosts = await getPosts();
    allPosts.forEach((item) => {
      const infoOfPots = structuresPost(item);
      timelineSection.prepend(infoOfPots);
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
