import '../firebase/firebaseconfig.js';
import { addPosts, getPosts } from '../firebase/firestoreauth.js';
import { structuresPost } from '../pages-components/components-js/post.js';
import { goOut, authentication } from '../firebase/firebaseauth.js';
import { componentHeader } from '../pages-components/components-js/header.js'; // importando componente de cabeçalho
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
    if (errorMessage === '' || !errorMessage) {// valida se a mensagem é inexistente ou vazia para bloquear o usuario de fazer um post nessas condições
      feedbackError.classList.add('error');//add é um metodo o classlist é para alterar as classes ajuda a estilizar pois acrescenta o error e ela como classe
      feedbackError.innerHTML = 'Campos obrigatórios!'; //diferença com o textcontent é que o innerhmtl interpreta coisas como html o innerhtml entende a semantica do html diferente do textcontent que não entende as tags e escreve elas
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

  const showingAllPosts = async () => { //geralmente é utilizado quando é puxado um serviço externo a grosso modo, porque depende de um tempo de resposta para acontecer. Para não interromper outras coisas e ficar esperando isso acontecer.
    const allPosts = await getPosts();
    allPosts.forEach((item) => {
      const infoOfPots = structuresPost(item);
      divAllPosts.prepend(infoOfPots);
    });
  };
  // função para o pessoa sair
  logout.addEventListener('click', (e) => {
    e.preventDefault();
    goOut().then(() => {
      window.location.hash = '';
    });
  });

  showingAllPosts();
  return feed;
};
