const express = require("express");

const {
  createWard,
  getWard,
  getWards,
  getWardsByFacilityId,
} = require("../controllers/wardController");

const router = express.Router();

router.get("/", getWards);
router.post("/new", createWard);
router.get("/id/:wardId", getWard);
router.get("/facilityid/:facilityId", getWardsByFacilityId);

module.exports = router;
