import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getFunctions } from 'firebase/functions'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyB0DU7l1OjmZSfXmpMoEXIqzqUYt7fJpDw",
    authDomain: "dropbox-clone-0709.firebaseapp.com",
    projectId: "dropbox-clone-0709",
    storageBucket: "dropbox-clone-0709.appspot.com",
    messagingSenderId: "1082334978640",
    appId: "1:1082334978640:web:243b9285f49bfe82f42755"
};


const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage }