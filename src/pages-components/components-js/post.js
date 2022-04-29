import { authentication } from '../../firebase/firebaseauth.js';
// import { liked, unlike } from '../../firebase/firestoreauth.js';
import { editPub, delPub } from './changes-posts.js';

export function structuresPost(item) {
  const containerPost = document.createElement('div');
  const checksUser = item.userEmail === authentication.currentUser.email;
  // componente para pegar as informações de quem postou
  const templatePosts = `
  <div class="post-div">
  <div>
  ${
    checksUser
      ? `
  <div class="btns">
  <button id="btn-edit" class="btn-edit">Editar</button>
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
        <button id="btn-like" class="button-like"><img class="like-icon" src="./img/amor-verde.png"/><p id="likes" class="likes">${
          item.like.length
        }</p>
        </button>
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
  return containerPost;
}
