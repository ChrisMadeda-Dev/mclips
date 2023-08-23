import { getApps, getApp, initializeApp, deleteApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyBxIsWEkJZgwwc5LD5d6rUtARjSjtWg2Lk',
	authDomain: 'mclipboard2.firebaseapp.com',
	projectId: 'mclipboard2',
	storageBucket: 'mclipboard2.appspot.com',
	messagingSenderId: '249287654418',
	appId: '1:249287654418:web:5144b46f4c4fcb603feccb'
};

// Initialize Firebase

let firebaseApp;

if (!getApps().length) {
	firebaseApp = initializeApp(firebaseConfig);
} else {
	(firebaseApp = getApp()), deleteApp(firebaseApp);
	firebaseApp = initializeApp(firebaseConfig);
}

export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
