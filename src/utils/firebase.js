import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCnNYakgMf5278l8wsl9SZMVKmhH4kgrIw',
  authDomain: 'astralis-35fba.firebaseapp.com',
  projectId: 'astralis-35fba',
  storageBucket: 'astralis-35fba.appspot.com',
  messagingSenderId: '11276213914',
  appId: '1:11276213914:web:60437ae684eda12ccac923',
  measurementId: 'G-0PLMX6C0NW',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const saveSubscriber = async ({ firstName, lastName, email }) => {
  try {
    await addDoc(collection(db, 'subscribers'), {
      firstName,
      lastName,
      email,
      createdAt: new Date(),
    });
    console.log('Subscriber saved:', firstName, lastName, email);
  } catch (error) {
    console.error('Saving error:', error);
  }
};
