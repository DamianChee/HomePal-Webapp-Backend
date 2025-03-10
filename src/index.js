// Imports using CommonJS
const express = require("express");
const path = require("path");
const cors = require("cors");
const http = require("http");

// Import verifyConnection function from config/firebase.js
const { getAdmin } = require("./config/firebase");

// Import socket service
const socketService = require("./services/socketService");

// Routers
const status = require("./routers/statusRoute");
const devices = require("./routers/deviceRoute");
const beds = require("./routers/bedRoute");
const events = require("./routers/eventRoute");
const facilities = require("./routers/facilityRoute");
const organizations = require("./routers/organizationRoute");
const patients = require("./routers/patientRoute");
const wards = require("./routers/wardRoute");

try {
  console.log("[index.js] Starting server initialization...");

  // Initialize Firebase Admin SDK
  const firebaseAdmin = getAdmin();

  // Create Express application instance
  const app = express();

  // Create HTTP server
  const server = http.createServer(app);

  // Middlewares
  app.use(cors());
  app.use(express.json());

  // This is to display when deployed on vercel to know the server is running
  app.get("/", (req, res) => {
    res.send("Express Backend is Running with WebSocket Support");
  });

  // Routers
  app.use("/api", status); // For checking connection status
  app.use("/beds", beds); // For beds
  app.use("/devices", devices); // For devices
  app.use("/events", events); // For events
  app.use("/facilities", facilities); // For facilities
  app.use("/organizations", organizations); // For organizations
  app.use("/patients", patients); // For patients
  app.use("/wards", wards); // For wards

  // Initialize WebSocket service
  socketService.initialize(server);

  // Add WebSocket status endpoint
  app.get("/websocket-status", (req, res) => {
    res.json({
      status: "ok",
      socketService: {
        initialized: !!socketService.io,
        connectedClients: socketService.connectedClients,
      },
    });
  });

  // Start up server on specified port OR default 5000
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT} with WebSocket support`);
  });

  // Handle process termination
  process.on('SIGTERM', () => {
    console.log('[index.js] SIGTERM received, shutting down gracefully');
    socketService.cleanup();
    server.close(() => {
      console.log('[index.js] Server closed');
      process.exit(0);
    });
  });

  process.on('SIGINT', () => {
    console.log('[index.js] SIGINT received, shutting down gracefully');
    socketService.cleanup();
    server.close(() => {
      console.log('[index.js] Server closed');
      process.exit(0);
    });
  });

  console.log("[index.js] Server initialization completed!");
} catch (error) {
  console.error("[index.js] Initialization failed:", error.message);
  process.exit(1);
}

// This isn't being used as I don't completely understand the code at the moment
// function FirebaseAuthentication() {
//   try {
//     // Set up authentication middleware
//     app.use(async (req, res, next) => {
//       const authHeader = req.headers.authorization;
//
//       if (authHeader && authHeader.startsWith("Bearer ")) {
//         const token = authHeader.split(" ")[1];
//         try {
//           const decodedToken = await admin.auth().verifyIdToken(token);
//           req.user = decodedToken;
//         } catch (error) {
//           console.error("[AUTH] Token verification failed:", error.message);
//         }
//       }
//
//       next();
//     });
//
//     console.log("[SERVER] Firebase authentication middleware initialized");
//   } catch (error) {
//     console.error("[SERVER] Firebase initialization failed:", error.message);
//     process.exit(1); // Exit application if Firebase fails to initialize
//   }
// }