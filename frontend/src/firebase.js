// Import the functions you need from the SDKs
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const api_Key = import.meta.env.VITE_APP_FIREBASE_API
const app_id = import.meta.env.VITE_APP_FIREBASE_APP_ID
const firebaseConfig = {
  apiKey: api_Key,
  authDomain: 'student-portal-73cbd.firebaseapp.com',
  projectId: 'student-portal-73cbd',
  storageBucket: 'student-portal-73cbd.appspot.com',
  messagingSenderId: '175911220594',
  appId: app_id,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// createRoleswithPolicies

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Providers for Google, Facebook, and Twitter Authentication
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
// export const twitterProvider = new TwitterAuthProvider();
