// Import the functions you need from the SDKs
const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
const { getAuth, GoogleAuthProvider, FacebookAuthProvider } = require('firebase/auth');

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDJ5HdvQFWOnBvDuzSTqEuKVZ-kRGAsVhE',
  authDomain: 'student-portal-73cbd.firebaseapp.com',
  projectId: 'student-portal-73cbd',
  storageBucket: 'student-portal-73cbd.appspot.com',
  messagingSenderId: '175911220594',
  appId: '1:175911220594:web:54c3f4aacdb3fb72de59eb',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Providers for Google and Facebook Authentication
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
// const twitterProvider = new TwitterAuthProvider();

// Export the Firebase configuration objects
module.exports = {
  db,
  auth,
  googleProvider,
  facebookProvider,
  // twitterProvider, // Uncomment if you are using Twitter authentication
};
