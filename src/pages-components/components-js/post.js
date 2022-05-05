/* eslint-disable max-len */
import { authentication } from '../../firebase/firebaseauth.js';
import { liked, unliked } from '../../firebase/firestoreauth.js';
import { editPub, delPub } from './changes-posts.js';

export function structuresPost(item) {
  const gettingUserEmail = authentication.currentUser;
  // let likesPost = item.like;
  const containerPost = document.createElement('div');
  const checksUser = item.userEmail === authentication.currentUser.email;
  // componente para pegar as informações de quem postou
  const templatePosts = `
    <div class="post-div">
  <div>
  ${checksUser
    ? `
  <div class="btns">
  <button id="btn-edit" class="btn-edit"><img class="icon-edit" src="./img/bi_pencil-fill.svg">Editar</button>
  <button id="btn-delete" class="btn-del"><img class="icon-bin" src="./img/delete.png">Excluir</button>
  </div>`
    : ''
}
  <div class="user-info">
      <p class="user-email">${item.userEmail}</p>
    </div>
    <div class="items-organization">
      <p class="info-date">${item.date}</p>
    </div>
      <textarea id="message" class='message' maxlength="200" disabled>${
  item.message
}</textarea>
        <div class="div-likes">
       <button id="btn-like" class="btn-like"><img class="like-icon" src="./img/flat-color-icons_like.svg"/></button><p id="like" class="likes">${
         item.likes.length
       }</p>
      </div>
   </div>`;
  containerPost.innerHTML = templatePosts;
  if (checksUser) {
    const deletePost = containerPost.querySelector('#btn-delete');

    deletePost.addEventListener('click', (e) => {
      e.preventDefault();
      // eslint-disable-next-line max-len
      containerPost.appendChild(delPub(item, containerPost)); // trás a mensagem pra confirmar a ação.
    });

    const btnEditPost = containerPost.querySelector('#btn-edit');

    btnEditPost.addEventListener('click', (e) => {
      e.preventDefault();
      containerPost.appendChild(editPub(item, containerPost)); // trás o texto para editar
    });
  }

  const btnlikes = containerPost.querySelector('.btn-like');
  const quantityLikes = containerPost.querySelector('#like');
  let arrOflikes = item.likes.length;

  btnlikes.addEventListener('click', async (e) => {
    e.preventDefault();
    if (!item.likes.includes(gettingUserEmail.uid)) {
      // se o usuário não tiver dado o like ele pode // ou seja limita o numero de likes por user a 1
      
      liked(item.id, gettingUserEmail.uid); // ta pegando o ID da Pub e ID do user
      item.likes.push(gettingUserEmail.uid); // pega o item(likes)/array da coleção
      arrOflikes += 1; // trás o array com o novo valor quando o user clica
      quantityLikes.textContent = arrOflikes; // printa o valor quantidade
    } else {
      const unlikedUser = item.likes.indexOf(gettingUserEmail); // PEGA  O 1ª ITEM DO ARRAY
      unliked(item.id, gettingUserEmail.uid);
      item.likes.splice(unlikedUser, 1); // O método splice() altera o conteúdo de uma lista, adicionando novos elementos enquanto remove elementos antigos.(https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
      arrOflikes -= 1; // SE COLOCAR MENOS -1 OU INVÉS DE = -1 O VALOR FICA NEGATIVO
      quantityLikes.textContent = arrOflikes;
    }
  });
  return containerPost;
}
