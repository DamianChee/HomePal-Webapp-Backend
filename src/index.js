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
const events = require("./routers/eventRoute");

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
  app.use("/events", events); // For events

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