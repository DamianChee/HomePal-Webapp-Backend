import express from "express";

const {
  createEvent,
  getEvent,
  getEvents,
  getEventsByDeviceId,
  getEventsByHandled,
  getEventsByAction,
  getLatestEvents,
  getRecentEvents,
} = require("../controllers/eventController");

const router = express.Router();

router.get("/", getEvents);
router.post("/new", createEvent);
router.get("/id/:eventId", getEvent);
router.get("/deviceid/:deviceId", getEventsByDeviceId);
router.get("/handled/:handled", getEventsByHandled);
router.get("/action/:action", getEventsByAction);
router.get("/latest", getLatestEvents);
router.get("/recent", getRecentEvents);

module.exports = router;
