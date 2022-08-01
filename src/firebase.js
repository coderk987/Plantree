// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyD0huNWRJqk9rHXSqFDfjjeNH4WtLcxt2k',
	authDomain: 'vasudha-37f55.firebaseapp.com',
	projectId: 'vasudha-37f55',
	storageBucket: 'vasudha-37f55.appspot.com',
	messagingSenderId: '107755614287',
	appId: '1:107755614287:web:ca21def1d7f542fee3fa3a'
};

let app;
if (getApps.length === 0) {
	app = initializeApp(firebaseConfig);
} else {
	getApp();
}

export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
