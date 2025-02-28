// Import using CommonJS
const firebaseAdmin = require("firebase-admin");
require("dotenv").config(); // For grabbing env

// Initialize Firebase Admin SDK
function initializeFirebaseAdmin() {
  try {
    // Check if required environment variables exist
    if (
      !process.env.FIREBASE_PROJECT_ID ||
      !process.env.FIREBASE_PRIVATE_KEY ||
      !process.env.FIREBASE_CLIENT_EMAIL ||
      !process.env.FIREBASE_STORAGE_BUCKET
    ) {
      throw new Error("Missing required Firebase environment variables");
    }

    // Create a service account Javascript Object
    const serviceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    };

    /**
     * Verify whether the Firebase Admin SDK has already been initialized. This
     * is a crucial safety mechanism that prevents multiple initializations of
     * the Firebase Admin SDK, which could lead to unexpected behavior and
     * resource leaks.
     *
     * - storageBucket
     *    Required when your admin backend needs to:
     *     - Upload or download files directly
     *     - Generate signed URLs for file access
     *     - Manage Cloud Storage security rules
     *     ! Not needed for basic authentication or admin operations
     * - databaseURL
     *    Required when your admin backend needs to:
     *     - Perform direct Realtime Database queries
     *     - Listen to database changes
     *     - Manage database security rules
     *     ! Not needed if you only use Firebase Authentication
     */
    if (admin.apps.length === 0) {
      firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(serviceAccount),
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        databaseURL: `https://${serviceAccount.projectId}.firebaseapp.com`,
      });

      // Verify initialization
      firebaseAdmin.app().options.projectId;

      console.log("Firebase Admin SDK initialized successfully");
      return firebaseAdmin;
    }

    console.log("Firebase Admin SDK already initialized");
    return firebaseAdmin;
  } catch (error) {
    console.error("Failed to initialize Firebase Admin SDK:", error);
  }
}

// Export functions to stuff
module.exports = {
  admin: () => {
    try {
      const admin = initializeFirebaseAdmin();

      return admin;
    } catch (error) {
      console.error("[FIREBASE] Connection verification failed:", error);
    }
  },
  db: () => {
    try {
      const db = initializeFirebaseAdmin().firestore();

      return db;
    } catch (error) {
      console.error("[db] Firestore failed:", error);
    }
  },
  auth: () => {
    try {
      const db = initializeFirebaseAdmin().auth();

      return db;
    } catch (error) {
      console.error("[auth] Authentication failed:", error);
    }
  },
  storage: () => {
    try {
      const db = initializeFirebaseAdmin().storage();

      return db;
    } catch (error) {
      console.error("[storage] Storage failed:", error);
    }
  },
};
