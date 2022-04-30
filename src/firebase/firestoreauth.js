import {
  getFirestore, // para usar os recursos do firestore
  collection, // parâmetro
  addDoc, // adiconar documentos na coleção
  getDocs, // pegar documentos da coleção
  orderBy, // ordenar por algum parâmetro
  query,
  deleteDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  // eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js';

export const db = getFirestore(); // do firestore

export async function addPosts(message, userEmail) {
  try {
    // eslint-disable-next-line max-len
    //  const documento referncia = await (pq é assincrona) addDOc function pronta (coleção (pega no Banco,// 'nome da coleção')  parametros a gente que escolhe
    const docRef = await addDoc(collection(db, 'posts'), {
      message,
      userEmail,
      date: new Date().toLocaleString('pt-br'), // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
      like: [],
    });
    console.log('Document written with ID: ', docRef.id); // do firestore
    return docRef.id;
  } catch (e) {
    console.error('Error adding document: ', e);
    return null;
  }
}
export const getPosts = async () => {
  const postsArr = [];
  const sortingByDate = query(collection(db, 'posts'), orderBy('date'));
  const querySnapshot = await getDocs(sortingByDate);
  querySnapshot.forEach((item) => {
    const pageFeed = item.data();
    pageFeed.id = item.id;
    postsArr.push(pageFeed);
  });

  return postsArr;
};
export function deleteDocument(itemId) {
  return deleteDoc(doc(db, 'posts', itemId));
}
export function updateDocument(itemId, message) {
  const docRefId = doc(db, 'posts', itemId);
  return updateDoc(docRefId, {
    message,
  });
}
export async function liked(itemId, userEmail) {
  try {
    const postId = doc(db, 'posts', itemId);
    return await updateDoc(postId, {
      likes: arrayUnion(userEmail),
    });
  } catch (e) {
    return console.log('Ocorreu algo de errado', e);
  }
}
export async function unlike(itemId, userEmail) {
  try {
    const postId = doc(db, 'posts', itemId);
    return await updateDoc(postId, {
      likes: arrayRemove(userEmail),
    });
  } catch (e) {
    return console.log('Não deu certo o like', e);
  }
}
