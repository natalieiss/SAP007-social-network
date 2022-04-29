import {
  updateDocument,
  deleteDocument,
} from '../../firebase/firestoreauth.js';

export function editPub(item, containerFeed) {
  const container = document.createElement('div');

  const templateChanges = `
  <div id="changes-container" class="changes-container">
  <div id="modal-content" class="modal-content">
    <div class="message-container">
      <textarea id="message" class="message" maxlength="200"
        placeholder="O que você está pensando?">${item.message}</textarea>
    </div>
  </div>
  <div class="btns">
    <button id="btn-save" class="btn-save">Salvar alterações</button>
    <button id="btn-cancel" class="btn-cancel">Cancelar alteraçõe</button>
  </div>
</div>
    `;
  container.innerHTML = templateChanges;

  const modal = container.querySelector('#changes-container');
  const confirm = container.querySelector('#btn-save');
  const cancelDel = container.querySelector('#btn-cancel');
  const message = container.querySelector('#message');

  confirm.addEventListener('click', () => {
    updateDocument(item.id, message.value);
    const messageEdit = containerFeed.querySelector('#message');
    messageEdit.innerHTML = message.value;
    container.remove();
  });
  cancelDel.addEventListener('click', () => {
    container.remove();
  });
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      container.remove();
    }
  });

  return container;
}
export function delPub(post, containerFeed) {
  const container = document.createElement('div');

  const templateChanges = `
  <div id="changes-container" class="changes-container">
    <div class="modal-content">
      <div class="delete-container" >
      <h2 class="text-modal">Apagar postagem?</h2>
        <p class="text-modal">Você tem certeza que deseja excluir esta publicação</p>
        <div>
          <button id="btn-yes" class="btn-yes">Sim</button>
          <button id="btn-no" class="btn-no">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
  `;
  container.innerHTML = templateChanges;
  const modal = container.querySelector('#changes-container');
  const butYes = container.querySelector('#btn-yes');
  const buttonNo = container.querySelector('#btn-no');

  butYes.addEventListener('click', () => {
    deleteDocument(post.id);
    containerFeed.remove();
  });
  buttonNo.addEventListener('click', () => {
    container.remove();
  });
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      container.remove();
    }
  });

  return container;
}
