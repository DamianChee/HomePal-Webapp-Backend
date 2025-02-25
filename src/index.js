const express = require("express");
const path = require("path");
const cors = require("cors");
const { verifyConnection } = require("./config/firebase");

const app = express();
console.log("[BACKEND] Starting server initialization...");

try {
  // Initialize Firebase and start server
  initializeFirebase()
    .then(() => {
      const PORT = process.env.PORT || 5000;
      app.listen(PORT, () => {
        console.log(`[SERVER] Running on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.error("[SERVER] Startup failed:", error.message);
      process.exit(1);
    });

  app.use(cors());
  app.use(express.json());

  const status = require("./routes/status");
  const devices = require("./routes/device");

  // This is to display when deployed on vercel to know the server is running
  app.get("/", (req, res) => {
    res.send("Express Backend Running on Vercel 3");
  });

  app.use("/api", status); // For checking connection status
  app.use("/devices", devices); // For getting back devices

  // Serve frontend static files
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../../frontend/build")));

    // Handle all other routes in production
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../../frontend/build", "index.html"));
    });
  }
} catch (error) {
  console.error("[BACKEND] Initialization failed:", error.message);
  process.exit(1);
}

async function initializeFirebase() {
  try {
    // Attempt connection verification
    await verifyConnection();

    // Set up authentication middleware
    app.use(async (req, res, next) => {
      const authHeader = req.headers.authorization;

      if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        try {
          const decodedToken = await admin.auth().verifyIdToken(token);
          req.user = decodedToken;
        } catch (error) {
          console.error("[AUTH] Token verification failed:", error.message);
        }
      }

      next();
    });

    console.log("[SERVER] Firebase authentication middleware initialized");
  } catch (error) {
    console.error("[SERVER] Firebase initialization failed:", error.message);
    process.exit(1); // Exit application if Firebase fails to initialize
  }
}
