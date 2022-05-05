import {
  updateDocument,
  deleteDocument,
} from '../../firebase/firestoreauth.js';

export function editPub(item, containerFeed) {
  const containerEdit = document.createElement('div');

  const templateEdit = `
  <div id="changes-container" class="changes-container">
  <div id="modal-content" class="modal-content">
    <div id='message-container' class="message-container">
      <textarea id="message" class="message" maxlength="200"
        placeholder="Vamos melhorar o planeta terra hoje? Digite aqui a sua mensagem.">${item.message}</textarea>
    </div>
  </div>
  <div class="btns-edit">
    <button id="btn-save" class="btn-save">Salvar alterações</button>
    <button id="btn-cancel" class="btn-cancel">Cancelar alterações</button>
  </div>
</div>
    `;
  containerEdit.innerHTML = templateEdit;

  const modalEdit = containerEdit.querySelector('#changes-container'); // pegar modal edit
  const confirmEdit = containerEdit.querySelector('#btn-save');
  const cancelEdit = containerEdit.querySelector('#btn-cancel');
  const message = containerEdit.querySelector('#message');

  confirmEdit.addEventListener('click', () => {
    updateDocument(item.id, message.value).then(() => {
      const messageEdit = containerFeed.querySelector('#message');
      messageEdit.innerHTML = message.value;
      containerEdit.remove();//remove coisas do HTML, quando a pessoa tiver realizado tudo que quer o modal é removido
    });
  });
  cancelEdit.addEventListener('click', () => {
    containerEdit.remove();
  });
  window.addEventListener('click', (e) => {
    if (e.target === modalEdit) { //fala pra gente qual é o elemento alvo do evento que a gente ta mapeando
      containerEdit.remove();
    }
  });
  return containerEdit;
}

export function delPub(item, containerFeed) {
  const containerDel = document.createElement('div');

  const templateChanges = `
    <div id="container-del" class="changes-container">
      <div class="content">
        <div class="delete-container" >
        <h2 id='text-modal' class="text-modal">Apagar a postagem?</h2>
          <p class="text-modal">Você tem certeza que deseja excluir esta publicação?</p>
          <div>
            <button id="btn-yes" class="btn-yes">Confirmar</button>
            <button id="btn-no" class="btn-no">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
    `;
  containerDel.innerHTML = templateChanges;
  const modalDel = containerDel.querySelector('#container-del'); // pegar modal del
  const btnConfirm = containerDel.querySelector('#btn-yes');
  const btnCancel = containerDel.querySelector('#btn-no');

  btnConfirm.addEventListener('click', () => {
    // pegar o click do botão (confirmação)
    deleteDocument(item.id).then(() => {
      containerFeed.remove();
    });
  });
  btnCancel.addEventListener('click', () => {
    // pegar o click do botão (quando a pessoa cancela)
    containerDel.remove();
  });
  window.addEventListener('click', (e) => { //o window o js já entende sem estar declarado
    // pra retirar o modal da tela
    if (e.target === modalDel) {
      containerDel.remove();
    }
  });
  return containerDel;
}
