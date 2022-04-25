import { authentication } from '../../firebase/authentication.js';
import { deleteDocument } from '../../firebase/firestoreconfig.js';

export function structuresPost(item) {
  const containerPost = document.createElement('li');
  const postagemDelete = item.userEmail === authentication.currentUser.email;
  // componente para pegar as informações de quem postou
  const templatePosts = `
      <div class='div-post'>
        <div class='information-organization'>
        <div>
          <p>${item.userEmail}</p> 
          ${
            postagemDelete
              ? ` 
          <div class='btn-edite'>
          <button class='btn-delete'>excluir</button>
          <button class ='btn-editar'>editar</button>
           </div>`
              : ''
          }
    
        <div class='information-organization'>
          <p>${item.date}</p>
        </div>
        <p>${item.message}</p>
        
        </div>
        <div class='like-container'>
        <img class='like-icon' src='../src/img/amor-verde.png'/>
        </div>
      </div>`;

  containerPost.innerHTML = templatePosts;

  if (postagemDelete) {
    const deletePosts = containerPost.querySelector('.btn-delete');

    deletePosts.addEventListener('click', (e) => {
      e.preventDefault();
      deleteDocument(item.id);
      containerPost.remove();
    });
  }
  return containerPost;
}
