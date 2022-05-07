/* eslint-disable max-len */
import { authentication } from '../../firebase/firebaseauth.js';
import { liked, unliked } from '../../firebase/firestoreauth.js';
import { editPub, delPub } from './changes-posts.js';

export function structuresPost(item) {
  const gettingUserEmail = authentication.currentUser;
  const containerPost = document.createElement('div');
  const checksUser = item.userEmail === authentication.currentUser.email;
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
      <textarea id="message" class='message' maxlength="200" disabled>${item.message
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
      containerPost.appendChild(delPub(item, containerPost));
    });

    const btnEditPost = containerPost.querySelector('#btn-edit');

    btnEditPost.addEventListener('click', (e) => {
      e.preventDefault();
      containerPost.appendChild(editPub(item, containerPost));
    });
  }

  const btnlikes = containerPost.querySelector('.btn-like');
  const quantityLikes = containerPost.querySelector('#like');
  let arrOflikes = item.likes.length;

  btnlikes.addEventListener('click', async (e) => {
    e.preventDefault();
    if (!item.likes.includes(gettingUserEmail.uid)) {           
      liked(item.id, gettingUserEmail.uid); 
      item.likes.push(gettingUserEmail.uid); 
      arrOflikes += 1; 
      quantityLikes.textContent = arrOflikes;
    } else {
      const unlikedUser = item.likes.indexOf(gettingUserEmail);
      unliked(item.id, gettingUserEmail.uid);
      item.likes.splice(unlikedUser, 1);
      arrOflikes -= 1;
      quantityLikes.textContent = arrOflikes;
    }
  });
  return containerPost;
}
