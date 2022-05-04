import { initializeApp, getAuth, getFirestore } from './export.js';

const firebaseConfig = {
  apiKey: 'AIzaSyDDolPc8XVDjQDsR2H1ShETWYckqVfsFK0',
  authDomain: 'neweco-2022.firebaseapp.com',
  projectId: 'neweco-2022',
  storageBucket: 'neweco-2022.appspot.com',
  messagingSenderId: '137738654234',
  appId: '1:137738654234:web:fd315e0c36256e4a9b37a3',
  measurementId: 'G-6RLQY7GY25',
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
