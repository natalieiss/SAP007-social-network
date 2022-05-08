import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  deleteDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  // eslint-disable-next-line import/no-unresolved
} from './export.js';

export const db = getFirestore();

export async function addPosts(message, userEmail) {
  try {
    const docRef = await addDoc(collection(db, 'posts'), {
      message,
      userEmail,
      date: new Date().toLocaleString('pt-br'),
      likes: [],
    });
    return docRef.id;
  } catch (e) {
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
  const postId = doc(db, 'posts', itemId);
  await updateDoc(postId, {
    likes: arrayUnion(userEmail),
  });
}
export async function unliked(itemId, userEmail) {
  const postId = doc(db, 'posts', itemId);
  await updateDoc(postId, {
    likes: arrayRemove(userEmail),
  });
}
