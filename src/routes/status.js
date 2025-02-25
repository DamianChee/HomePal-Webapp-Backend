const express = require("express");
const router = express.Router();
const { verifyFirebaseAdmin } = require("../utils/firebaseUtils");
const formatDate = require("../utils/dateFormatter");

router.get("/status", async (req, res) => {
  console.log("[BACKEND] Status check received");

  try {
    // Verify Firebase admin connection
    await verifyFirebaseAdmin();

    // Prepare success response
    const status = {
      status: "running",
      timestamp: formatDate(),
      environment: process.env.NODE_ENV || "development",
    };

    console.log("[BACKEND] Status check successful");
    res.json(status);
  } catch (error) {
    console.error("[BACKEND] Status check failed:", error.message);
    res.status(500).json({
      status: "error",
      error: error.message,
    });
  }
});

module.exports = router;
