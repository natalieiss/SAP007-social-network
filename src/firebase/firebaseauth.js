import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from './export.js';

const provider = new GoogleAuthProvider();
export const authentication = getAuth();

export function createNewUser(email, password) {
  return createUserWithEmailAndPassword(authentication, email, password).then(
    (userCredential) => {
      const user = userCredential.user;
      return user;
    },
  );
}

export function signInPassword(email, password) {
  return signInWithEmailAndPassword(authentication, email, password).then(
    (userCredential) => {
      const user = userCredential.user;
      return user;
    },
  );
}
export function googleLogin() {
  return signInWithPopup(authentication, provider).then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    return credential;
  });
}
export function stateVerification(cb) {
  onAuthStateChanged(authentication, (user) => {
    cb(user != null);
  });
}
// função sair
export function goOut() {
  return signOut(authentication)
    .then(() => 'Logout')
    .catch((error) => error);
}
