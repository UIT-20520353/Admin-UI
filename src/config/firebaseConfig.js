import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCTjBfahhPFyazdYDYhH1PRn_2TVPIYUPU',
  authDomain: 'capstone-1-48ee6.firebaseapp.com',
  projectId: 'capstone-1-48ee6',
  storageBucket: 'capstone-1-48ee6.appspot.com',
  messagingSenderId: '354762475454',
  appId: '1:354762475454:web:157a9cf865a3e2dc7c5bef',
  measurementId: 'G-P1JVYHQQPS',
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase
const storage = getStorage(app);
export default storage;
