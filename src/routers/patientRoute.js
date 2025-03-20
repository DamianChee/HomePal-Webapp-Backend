const express = require("express");

const {
  createPatient,
  getPatient,
  getPatients,
  getPatientsByName,
  getPatientsByGender,
  getPatientsByActivityLevel,
  getPatientsByAssistanceLevel,
  getPatientsByDiaper,
  getPatientsByRestraints,
  getPatientsByMobility,
  getPatientsByBedExitAlerts,
  getPatientsByAttemptedBedExitAlerts,
  getPatientsByBedFallAlerts,
} = require("../controllers/patientController");

const router = express.Router();

router.get("/", getPatients);
router.post("/new", createPatient);
router.get("/id/:patientId", getPatient);
router.get("/name/:name", getPatientsByName);
router.get("/gender/:gender", getPatientsByGender);
router.get("/activitylevel/:activityLevel", getPatientsByActivityLevel);
router.get("/assistancelevel/:assistanceLevel", getPatientsByAssistanceLevel);
router.get("/diaper/:hasDiaper", getPatientsByDiaper);
router.get("/restraints/:hasRestraints", getPatientsByRestraints);
router.get("/mobility/:mobility", getPatientsByMobility);
router.get("/bedexitalerts/:showBedExitAlerts", getPatientsByBedExitAlerts);
router.get(
  "/attemptedbedexitalerts/:showAttemptedBedExitAlerts",
  getPatientsByAttemptedBedExitAlerts
);
router.get(
  "/bedsidefallalert/:showBedsideFallAlerts",
  getPatientsByBedFallAlerts
);

module.exports = router;
