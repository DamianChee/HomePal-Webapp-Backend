const express = require("express");

const {
  createEvent,
  getEvent,
  getEvents,
  getEventsByDeviceId,
  getEventsByHandled,
  getEventsByAction,
  getLatestEvents,
  getRecentEvents,
  deleteEvent,
} = require("../controllers/eventController");

// Import socket service for test endpoint
const socketService = require("../services/socketService");

const router = express.Router();

router.get("/", getEvents);
router.post("/new", createEvent);
router.get("/id/:eventId", getEvent);
router.get("/deviceid/:deviceId", getEventsByDeviceId);
router.get("/handled/:handled", getEventsByHandled);
router.get("/action/:action", getEventsByAction);
router.get("/latest", getLatestEvents);
router.get("/recent", getRecentEvents);
router.delete("/delete/:eventId", deleteEvent);

// Test endpoint to broadcast a mock event via WebSockets
router.post("/test-websocket", async (req, res) => {
  try {
    const eventData = req.body;

    // Validate input
    if (!eventData.action) {
      return res.status(400).json({
        status: "error",
        message: "Event action is required",
      });
    }

    // Create a mock event with the provided data
    const mockEvent = {
      eventId: `TEST-WS-${Date.now()}`,
      action: eventData.action,
      deviceId: eventData.deviceId || "test-device-001",
      time: new Date(),
      isHandled: false,
      ...eventData,
    };

    // Add to Firestore via the socketService
    await socketService.handleCreateMockEvent(mockEvent);

    res.status(200).json({
      status: "ok",
      message: "Test event created",
      eventId: mockEvent.eventId,
    });
  } catch (error) {
    console.error("[/events/test-websocket] Error:", error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

module.exports = router;
