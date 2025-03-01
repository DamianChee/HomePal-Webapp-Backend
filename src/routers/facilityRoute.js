import express from "express";

const {
  createFacility,
  getFacility,
  getFacilities,
  getFacilitiesByName,
  getFacilitiesByOrganizationId,
  getFacilitiesByType,
  getFacilitiesByContactInfo,
} = require("../controllers/facilityController");

const router = express.Router();

router.get("/", getFacilities);
router.post("/new", createFacility);
router.get("/id/:facilityId", getFacility);
router.get("/name/:name", getFacilitiesByName);
router.get("/organizationid/:organizationId", getFacilitiesByOrganizationId);
router.get("/type/:type", getFacilitiesByType);
router.get("/contact/:contact", getFacilitiesByContactInfo);

module.exports = router;
