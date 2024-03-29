import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyApUjBqcnBImq0kssxUqlPBgX1EXr2Z2kA',
  authDomain: 'chefsmenu-a26a7.firebaseapp.com',
  projectId: 'chefsmenu-a26a7',
  storageBucket: 'chefsmenu-a26a7.appspot.com',
  messagingSenderId: '397921396228',
  appId: '1:397921396228:web:fae7fdb3004fc8aae37751',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
