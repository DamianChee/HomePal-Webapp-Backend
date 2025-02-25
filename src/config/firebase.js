const firebaseAdmin = require("firebase-admin");
require("dotenv").config();

try {
  // Check if required environment variables exist
  if (
    !process.env.FIREBASE_PROJECT_ID ||
    !process.env.FIREBASE_PRIVATE_KEY ||
    !process.env.FIREBASE_CLIENT_EMAIL
  ) {
    throw new Error("Missing required Firebase environment variables");
  }

  // Create a service account Javascript Object
  const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  };

  // Initialize Firebase Admin SDK
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: `https://${serviceAccount.projectId}.firebaseapp.com`,
  });

  // Eventually replace this with some other logger
  console.log("[FIREBASE] Admin SDK initialized successfully");

  // Export verification function
  module.exports.verifyConnection = async () => {
    try {
      // Attempt to call the firebase admin auth service, if it fails it'll
      // throw an error, otherwise the connection to firebase is a success
      await firebaseAdmin.auth().listUsers(1);
      console.log("[FIREBASE] Connection verified successfully");
    } catch (error) {
      console.error(
        "[FIREBASE] Connection verification failed:",
        error.message
      );
      throw error;
    }
  };

  // Export admin instance
  module.exports.firebaseAdmin = firebaseAdmin;
} catch (error) {
  console.error("[FIREBASE] Initialization failed:", error.message);
  throw error;
}
