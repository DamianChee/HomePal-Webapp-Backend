import express from "express";

const {
  createEvent,
  getEvent,
  getEvents,
  getEventsByDeviceId,
  getEventsByHandled,
  getEventsByAction,
} = require("../controllers/eventController");

const router = express.Router();

router.get("/", getEvents);
router.post("/new", createEvent);
router.get("/id/:eventId", getEvent);
router.get("/deviceid/:deviceId", getEventsByDeviceId);
router.get("/handled/:handled", getEventsByHandled);
router.get("/action/:action", getEventsByAction);

module.exports = router;
