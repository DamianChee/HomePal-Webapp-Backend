import express from "express";

const {
  createDevice,
  getDevice,
  getDevices,
} = require("../controllers/deviceController.js");

const router = express.Router();

router.get("/", getDevices);
router.post("/new", createDevice);
router.get("/:id", getDevice);

export default router;
