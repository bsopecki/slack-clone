// Import the functions you need from the SDKs you need
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyCdVQWTtePcS9EDkpS5_sBrBhGBWhh90z0',
	authDomain: 'react-slack-clone-e0e60.firebaseapp.com',
	projectId: 'react-slack-clone-e0e60',
	storageBucket: 'react-slack-clone-e0e60.appspot.com',
	messagingSenderId: '83837719707',
	appId: '1:83837719707:web:bcd20d076729324bf4a23e',
	measurementId: 'G-6CR83KMJDT',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
