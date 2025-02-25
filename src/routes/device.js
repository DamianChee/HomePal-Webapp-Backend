import express from "express";

import {
  createDevice,
  getDevice,
  getDevices,
} from "../controllers/deviceController.js";

const router = express.Router();

router.get("/", getDevices);
router.post("/new", createDevice);
router.get("/:id", getDevice);

export default router;
