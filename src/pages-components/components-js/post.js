import { authentication } from '../../firebase/firebaseauth.js';
// import { liked, unlike } from '../../firebase/firestoreauth.js';
import { editPub, delPub } from './changes-posts.js';

export function structuresPost(item) {
  const containerPost = document.createElement('div');
  const postagemDelete = item.userEmail === authentication.currentUser.email;
  // componente para pegar as informações de quem postou
  const templatePosts = `
  <div class="post-div">
  <div>
  ${
    postagemDelete
      ? `
  <div class="icons-container">
  <button class="modal-buttons" id="modal-btn-edit">Editar</button>
  <button class="modal-buttons"  id="modal-btn-delete"><img class="icon-del" src="./img/delete.png">Excluir</button>
  </div>`
      : ''
  }
  <div class="user-info">
      <p class="user-email">${item.userEmail}</p>
      </div>
    <div class="items-organization">
      <p>${item.date}</p>
    </div>
      <textarea id="message" disabled>${item.message}</textarea>
        <div class="like-container">
        <button id="button-like" class="button-like"><img class="like-icon" src="./img/amor-verde.png"/><p id="likes" class="likes">${
          item.like.length
        }</p>
        </button>
        </div>
</div>`;

  containerPost.innerHTML = templatePosts;
  if (postagemDelete) {
    const deletePost = containerPost.querySelector('#modal-btn-delete');

    deletePost.addEventListener('click', (e) => {
      e.preventDefault();
      containerPost.appendChild(delPub(item, containerPost));
    });

    const btnEditPost = containerPost.querySelector('.icons-container');

    btnEditPost.addEventListener('click', (e) => {
      e.preventDefault();
      containerPost.appendChild(editPub(item, containerPost));
    });
  }
  return containerPost;
}
