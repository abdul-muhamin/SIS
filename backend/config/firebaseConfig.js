// config/firebaseConfig.js

const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

// Initialize the Firebase app with the service account credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://student-portal-73cbd-default-rtdb.firebaseio.com/"
});

// Export Firestore database instance
const db = admin.firestore();

module.exports = db;
