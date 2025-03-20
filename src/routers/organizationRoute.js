const express = require("express");

const {
  createOrganization,
  getOrganization,
  getOrganizations,
  getOrganizationsByName,
  getOrganizationsByContactInfo,
} = require("../controllers/organizationController");

const router = express.Router();

router.get("/", getOrganizations);
router.post("/new", createOrganization);
router.get("/id/:organizationId", getOrganization);
router.get("/name/:name", getOrganizationsByName);
router.get("/contact/:contact", getOrganizationsByContactInfo);

module.exports = router;
