import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyAhd5NPS6YuVB4I_-g2V6V_LctL7bTIBWw',
  authDomain: 'portfolio-b1159.firebaseapp.com',
  projectId: 'portfolio-b1159',
  storageBucket: 'portfolio-b1159.firebasestorage.app',
  messagingSenderId: '516182436239',
  appId: '1:516182436239:web:20c1eae0d9b693106643fa',
  measurementId: 'G-00ZN4JQQW0',
};

export const app = initializeApp(firebaseConfig);
export const analyticsReady = isSupported()
  .then((supported) => (supported ? getAnalytics(app) : null))
  .catch(() => null);
