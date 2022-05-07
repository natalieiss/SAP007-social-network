export {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js'; //eslint-disable-line

export { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js'; //eslint-disable-line

export {
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
} from // eslint-disable-next-line import/no-unresolved
  'https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js';
