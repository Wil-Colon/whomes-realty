import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyAIqTYQs-akp4fYPI3dsRZabzhjSxvd27w',
    authDomain: 'w-homes-275600.firebaseapp.com',
    projectId: 'w-homes-275600',
    storageBucket: 'w-homes-275600.appspot.com',
    messagingSenderId: '160421674253',
    appId: '1:160421674253:web:3efa5617ddbb071b100444',
    measurementId: 'G-C27LBTBZPT',
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

const analytics = getAnalytics(app);

export default storage;
