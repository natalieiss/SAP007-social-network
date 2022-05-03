export {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  // sendEmailVerification,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut,
} from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js'; //eslint-disable-line

export {
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
} from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js'; //eslint-disable-line