const { getDB } = require("../config/firebase");
const parseBoolean = require("../utils/parseBoolean");

/**
 * I'm using the Node.js methods below found on the Firebase
 * Documentation because of readability but since the backend runs on Node.js
 * then perhaps some consistency might be better
 * https://firebase.google.com/docs/firestore/manage-data/add-data#node.js_1
 */

const db = getDB();

// CREATE
// I don't expect this to be used ever other than for testing
const createPatient = async (req, res) => {
  try {
    const data = req.body;

    if (!data.id) throw new Error("req sent in has no ID/Name!");
    const patientsRef = db.collection("patients");
    const response = await patientsRef.doc(data.id).set(data);

    res.status(200).send({
      message: "Patient created successfully",
      response: response,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// READ ALL PATIENTS
const getPatients = async (req, res) => {
  try {
    // This returns a firebase query snapshot
    const patientsRef = db.collection("patients");
    const patients = await patientsRef.get();

    if (patients.empty) {
      return res.status(404).send("No patients found");
    }

    // Use forEach to loop through the returned query snapshot and push into
    // an array for my own return and sending
    const patientsArray = [];
    patients.forEach((doc) => {
      patientsArray.push(doc.data());
      console.log(doc.id, "=>", doc.data());
    });

    res.status(200).send(patientsArray);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).send("Internal Server Error");
  }
};

// READ ONE PATIENT
const getPatient = async (req, res) => {
  try {
    const id = req.params.patientId;
    // returns firestore + path
    const patientRef = db.collection("patients").doc(id);
    // returns some sort of object with data inside private _fieldsProto
    const patient = await patientRef.get();

    // You have to use exists when using collection().doc() as it returns only
    // ONE "object" as opposed to .empty where it's potentially more than one
    if (!patient.exists) res.status(404).send("Patient not found");
    res.status(200).send(patients.data());
  } catch (error) {
    console.error("Error fetching patient:", error);
    res.status(400).send(error.message);
  }
};

// FIND ALL PATIENTS BY NAME (IN CASE SAME NAME SEARCH)
const getPatientsByName = async (req, res) => {
  try {
    const name = req.params.name;
    // This returns a firebase query snapshot
    const patientsRef = db
      .collection("patients")
      .where("patientName", "==", name);
    const patients = await patientsRef.get();

    // You have to use empty to check if there are any results returned when
    // expecting potentially more than one
    if (patients.empty) {
      return res.status(404).send(`There are no patients named: ${name}!`);
    }

    // Use forEach to loop through the returned query snapshot and push into
    // an array for my own return and sending
    const patientsArray = [];
    patients.forEach((doc) => {
      patientsArray.push(doc.data());
      console.log(doc.id, "=>", doc.data());
    });
    res.status(200).send(patientsArray);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(400).send(error.message);
  }
};

// FIND ALL PATIENTS BY GENDER
const getPatientsByGender = async (req, res) => {
  try {
    const gender = req.params.gender;
    // This returns a firebase query snapshot
    const patientsRef = db.collection("patients").where("gender", "==", gender);
    const patients = await patientsRef.get();

    // You have to use .empty to check if there are any results returned
    if (patients.empty) {
      return res
        .status(404)
        .send(`There are no patients with the gender: ${gender}!`);
    }

    // Use forEach to loop through the returned query snapshot and push into
    // an array for my own return and sending
    const patientsArray = [];
    patients.forEach((doc) => {
      patientsArray.push(doc.data());
      console.log(doc.id, "=>", doc.data());
    });
    res.status(200).send(patientsArray);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(400).send(error.message);
  }
};

// FIND ALL PATIENTS BY ACTIVITY LEVEL
const getPatientsByActivityLevel = async (req, res) => {
  try {
    const activityLevel = req.params.activityLevel;
    // This returns a firebase query snapshot
    const patientsRef = db
      .collection("patients")
      .where("activityLevel", "==", activityLevel);
    const patients = await patientsRef.get();

    // You have to use .empty to check if there are any results returned
    if (patients.empty) {
      return res
        .status(404)
        .send(
          `There are no patients with the activity level: ${activityLevel}!`
        );
    }

    // Use forEach to loop through the returned query snapshot and push into
    // an array for my own return and sending
    const patientsArray = [];
    patients.forEach((doc) => {
      patientsArray.push(doc.data());
      console.log(doc.id, "=>", doc.data());
    });
    res.status(200).send(patientsArray);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(400).send(error.message);
  }
};

// FIND ALL PATIENTS BY ASSISTANCE LEVEL
const getPatientsByAssistanceLevel = async (req, res) => {
  try {
    const assistanceLevel = req.params.assistanceLevel;
    // This returns a firebase query snapshot
    const patientsRef = db
      .collection("patients")
      .where("assistanceLevel", "==", assistanceLevel);
    const patients = await patientsRef.get();

    // You have to use .empty to check if there are any results returned
    if (patients.empty) {
      return res
        .status(404)
        .send(
          `There are no patients with the assistance level: ${assistanceLevel}!`
        );
    }

    // Use forEach to loop through the returned query snapshot and push into
    // an array for my own return and sending
    const patientsArray = [];
    patients.forEach((doc) => {
      patientsArray.push(doc.data());
      console.log(doc.id, "=>", doc.data());
    });
    res.status(200).send(patientsArray);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(400).send(error.message);
  }
};

// FIND ALL PATIENTS BY DIAPER
const getPatientsByDiaper = async (req, res) => {
  try {
    const hasDiaper = parseBoolean(req.params.hasDiaper);
    // This returns a firebase query snapshot
    const patientsRef = db
      .collection("patients")
      .where("hasDiaper", "==", hasDiaper);
    const patients = await patientsRef.get();

    // You have to use .empty to check if there are any results returned
    if (patients.empty) {
      return res
        .status(404)
        .send(
          `There are no patients with that ${
            hasDiaper ? "needs" : "doesn't need"
          } diapers!`
        );
    }

    // Use forEach to loop through the returned query snapshot and push into
    // an array for my own return and sending
    const patientsArray = [];
    patients.forEach((doc) => {
      patientsArray.push(doc.data());
      console.log(doc.id, "=>", doc.data());
    });
    res.status(200).send(patientsArray);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(400).send(error.message);
  }
};

// FIND ALL PATIENTS BY RESTRAINTS
const getPatientsByRestraints = async (req, res) => {
  try {
    const hasRestraints = parseBoolean(req.params.hasRestraints);
    // This returns a firebase query snapshot
    const patientsRef = db
      .collection("patients")
      .where("hasRestraints", "==", hasRestraints);
    const patients = await patientsRef.get();

    // You have to use .empty to check if there are any results returned
    if (patients.empty) {
      return res
        .status(404)
        .send(
          `There are no patients with that ${
            hasDiaper ? "needs" : "doesn't need"
          } restraints!`
        );
    }

    // Use forEach to loop through the returned query snapshot and push into
    // an array for my own return and sending
    const patientsArray = [];
    patients.forEach((doc) => {
      patientsArray.push(doc.data());
      console.log(doc.id, "=>", doc.data());
    });
    res.status(200).send(patientsArray);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(400).send(error.message);
  }
};

// FIND ALL PATIENTS BY MOBILITY
const getPatientsByMobility = async (req, res) => {
  try {
    const mobility = req.params.mobility;
    // This returns a firebase query snapshot
    const patientsRef = db
      .collection("patients")
      .where("mobility", "==", mobility);
    const patients = await patientsRef.get();

    // You have to use .empty to check if there are any results returned
    if (patients.empty) {
      return res
        .status(404)
        .send(`There are no patients with the mobility: ${mobility}!`);
    }

    // Use forEach to loop through the returned query snapshot and push into
    // an array for my own return and sending
    const patientsArray = [];
    patients.forEach((doc) => {
      patientsArray.push(doc.data());
      console.log(doc.id, "=>", doc.data());
    });
    res.status(200).send(patientsArray);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(400).send(error.message);
  }
};

// FIND ALL PATIENTS BY BED EXIT ALERTS
const getPatientsByBedExitAlerts = async (req, res) => {
  try {
    const showBedExitAlerts = parseBoolean(req.params.showBedExitAlerts);
    // This returns a firebase query snapshot
    const patientsRef = db
      .collection("patients")
      .where("showBedExitAlerts", "==", showBedExitAlerts);
    const patients = await patientsRef.get();

    // You have to use .empty to check if there are any results returned
    if (patients.empty) {
      return res
        .status(404)
        .send(
          `There are no patients ${
            showBedExitAlerts ? "being" : "not being"
          } monitored for bed exit alerts!`
        );
    }

    // Use forEach to loop through the returned query snapshot and push into
    // an array for my own return and sending
    const patientsArray = [];
    patients.forEach((doc) => {
      patientsArray.push(doc.data());
      console.log(doc.id, "=>", doc.data());
    });
    res.status(200).send(patientsArray);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(400).send(error.message);
  }
};

// FIND ALL PATIENTS BY ATTEMPTED BED EXIT ALERTS
const getPatientsByAttemptedBedExitAlerts = async (req, res) => {
  try {
    const showAttemptedBedExitAlerts = parseBoolean(
      req.params.showAttemptedBedExitAlerts
    );
    // This returns a firebase query snapshot
    const patientsRef = db
      .collection("patients")
      .where("showAttemptedBedExitAlerts", "==", showAttemptedBedExitAlerts);
    const patients = await patientsRef.get();

    // You have to use .empty to check if there are any results returned
    if (patients.empty) {
      return res
        .status(404)
        .send(
          `There are no patients ${
            showAttemptedBedExitAlerts ? "being" : "not being"
          } monitored for attempted bed exit alerts!`
        );
    }

    // Use forEach to loop through the returned query snapshot and push into
    // an array for my own return and sending
    const patientsArray = [];
    patients.forEach((doc) => {
      patientsArray.push(doc.data());
      console.log(doc.id, "=>", doc.data());
    });
    res.status(200).send(patientsArray);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(400).send(error.message);
  }
};

// FIND ALL PATIENTS BY BED FALL ALERTS
const getPatientsByBedFallAlerts = async (req, res) => {
  try {
    const showBedsideFallAlerts = parseBoolean(
      req.params.showBedsideFallAlerts
    );
    // This returns a firebase query snapshot
    const patientsRef = db
      .collection("patients")
      .where("showBedsideFallAlerts", "==", showBedsideFallAlerts);
    const patients = await patientsRef.get();

    // You have to use .empty to check if there are any results returned
    if (patients.empty) {
      return res
        .status(404)
        .send(
          `There are no patients ${
            showBedsideFallAlerts ? "being" : "not being"
          } monitored for bed fall alerts!`
        );
    }

    // Use forEach to loop through the returned query snapshot and push into
    // an array for my own return and sending
    const patientsArray = [];
    patients.forEach((doc) => {
      patientsArray.push(doc.data());
      console.log(doc.id, "=>", doc.data());
    });
    res.status(200).send(patientsArray);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(400).send(error.message);
  }
};

module.exports = {
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
};
