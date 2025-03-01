import express from "express";

const {
  createBed,
  getBeds,
  getBed,
  getBedsByAssigned,
  getBedsByOccupied,
  getBedsByWardId,
  getBedsByWardNumber,
} = require("../controllers/bedController");

const router = express.Router();

router.get("/", getBeds);
router.post("/new", createBed);
router.get("/id/:bedId", getBed);
router.get("/assigned/:assigned", getBedsByAssigned);
router.get("/occupied/:occupied", getBedsByOccupied);
router.get("/wardid/:wardId", getBedsByWardId);
router.get("/wardnumber/:wardNumber", getBedsByWardNumber);

module.exports = router;
