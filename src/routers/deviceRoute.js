import express from "express";

const {
  createDevice,
  getDevice,
  getDevices,
  getDevicesByStatus,
} = require("../controllers/deviceController");

const router = express.Router();

router.get("/", getDevices);
router.post("/new", createDevice);
router.get("/id/:deviceId", getDevice);
router.get("/status/:status", getDevicesByStatus);

module.exports = router;
