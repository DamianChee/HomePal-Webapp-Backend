import express from "express";

const {
  createEvent,
  getEvent,
  getEvents,
  getEventsByDeviceId,
  getEventsByHandled,
} = require("../controllers/eventController");

const router = express.Router();

router.get("/", getEvents);
router.post("/new", createEvent);
router.get("/id/:deviceId", getEvent);
router.get("/deviceid/:deviceId", getEventsByDeviceId);
router.get("/handled/:handled", getEventsByHandled);

module.exports = router;
