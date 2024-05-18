// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC1mF9op8jlBH4d_gk3ZTZn4FL895u790Y',
  authDomain: 'litebook-59747.firebaseapp.com',
  projectId: 'litebook-59747',
  storageBucket: 'litebook-59747.appspot.com',
  messagingSenderId: '366539672430',
  appId: '1:366539672430:web:aac608b964bb31afbbcf7f',
  measurementId: 'G-MJLPP89RPV',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const auth = initializeAuth(app, {
//   persistence: {
//     type: 'LOCAL',
//   },
// });
export const auth = getAuth(app);
export const db = getFirestore(app);
