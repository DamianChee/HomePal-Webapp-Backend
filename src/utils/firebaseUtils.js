import firebaseAdmin from "firebase-admin";

export const verifyFirebaseAdmin = async () => {
  console.log("[UTILS] Verifying Firebase admin connection...");

  try {
    // Verify Firebase admin initialization
    const apps = firebaseAdmin.apps;
    if (!apps.length) {
      throw new Error("Firebase admin SDK not initialized");
    }

    // Verify authentication works
    await firebaseAdmin.auth().listUsers(1);
    console.log("[UTILS] Firebase admin connection verified");

    return true;
  } catch (error) {
    console.error("[UTILS] Firebase verification failed:", error.message);
    throw error;
  }
};
