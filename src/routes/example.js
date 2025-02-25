import express from "express";

import {
  createExample,
  getExample,
  getExamples,
  updateExample,
  deleteExample,
} from "../controllers/exampleController.js";

const router = express.Router();

router.get("/", getExamples);
router.post("/new", createExample);
router.get("/:id", getExample);
router.put("/:id", updateExample);
router.delete("/:id", deleteExample);

export default router;
