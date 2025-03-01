const { getDB } = require("../config/firebase");
const { parseBoolean } = require("../utils/parseBoolean");

/**
 * I'm using the Node.js methods below found on the Firebase
 * Documentation because of readability but since the backend runs on Node.js
 * then perhaps some consistency might be better
 * https://firebase.google.com/docs/firestore/manage-data/add-data#node.js_1
 */

const db = getDB();

// CREATE
const createBed = async (req, res) => {
  try {
    const data = req.body;

    // Sanity checks
    if (!data.id) throw new Error("req sent in has no bed ID/Name!");
    const bedsRef = db.collection("beds");
    const response = await bedsRef.doc(data.id).set(data);

    res
      .status(200)
      .send({ message: "Bed created successfully", response: response });
  } catch (error) {
    console.error("Error creating bed:", error);
    res.status(400).send(error.message);
  }
};

// READ ALL BEDS
const getBeds = async (req, res) => {
  try {
    const bedsRef = db.collection("beds");
    const beds = await bedsRef.get();

    if (beds.empty) {
      return res.status(404).send("No Beds found");
    }

    // Use forEach to loop through the returned query snapshot and push into
    // an array for my own return and sending
    const bedsArray = [];
    beds.forEach((doc) => {
      bedsArray.push(doc.data());
      console.log(doc.id, "=>", doc.data());
    });

    res.status(200).send(bedsArray);
  } catch (error) {
    console.error("Error fetching beds:", error);
    res.status(500).send("Internal Server Error");
  }
};

// READ ONE BED
const getBed = async (req, res) => {
  try {
    const id = req.params.bedId;
    const bedRef = db.collection("beds").doc(id);
    const bed = await bedRef.get();

    if (bed.exists) {
      res.status(200).send(bed.data());
    } else {
      res.status(404).send("Bed not found");
    }
  } catch (error) {
    console.error("Error fetching bed:", error);
    res.status(400).send(error.message);
  }
};

// FIND ALL BEDS BY ASSIGNED (true/false)
const getBedsByAssigned = async (req, res) => {
  try {
    const assigned = parseBoolean(req.params.assigned);
    // This returns a firebase query snapshot
    const bedsRef = db.collection("beds").where("isAssigned", "==", assigned);
    const beds = await bedsRef.get();

    if (beds.empty) {
      return res
        .status(404)
        .send(`There are no ${assigned ? "assigned" : "unassigned"} beds!`);
    }

    // Use forEach to loop through the returned query snapshot and push into
    // an array for my own return and sending
    const bedsArray = [];
    beds.forEach((doc) => {
      bedsArray.push(doc.data());
      console.log(doc.id, "=>", doc.data());
    });
    res.status(200).send(bedsArray);
  } catch (error) {
    console.error("Error fetching beds:", error);
    res.status(400).send(error.message);
  }
};

// FIND ALL BEDS BY OCCUPIED (true/false)
const getBedsByOccupied = async (req, res) => {
  try {
    const occupied = parseBoolean(req.params.occupied);
    // This returns a firebase query snapshot
    const bedsRef = db.collection("beds").where("isOccupied", "==", occupied);
    const beds = await bedsRef.get();

    if (beds.empty) {
      return res
        .status(404)
        .send(`There are no ${occupied ? "occupied" : "unoccupied"} beds!`);
    }

    // Use forEach to loop through the returned query snapshot and push into
    // an array for my own return and sending
    const bedsArray = [];
    beds.forEach((doc) => {
      bedsArray.push(doc.data());
      console.log(doc.id, "=>", doc.data());
    });
    res.status(200).send(bedsArray);
  } catch (error) {
    console.error("Error fetching beds:", error);
    res.status(400).send(error.message);
  }
};

// FIND ALL DEVICES BY WARD ID
const getBedsByWardId = async (req, res) => {
  try {
    const wardId = req.params.wardId;
    // This returns a firebase query snapshot
    const bedsRef = db.collection("beds").where("wardId", "==", wardId);
    const beds = await bedsRef.get();

    if (beds.empty) {
      return res.status(404).send(`There are no bed in ${wardId}!`);
    }

    // Use forEach to loop through the returned query snapshot and push into
    // an array for my own return and sending
    const bedsArray = [];
    beds.forEach((doc) => {
      bedsArray.push(doc.data());
      console.log(doc.id, "=>", doc.data());
    });
    res.status(200).send(bedsArray);
  } catch (error) {
    console.error("Error fetching beds:", error);
    res.status(400).send(error.message);
  }
};

// FIND ALL DEVICES BY STATUS (online/offline)
const getBedsByWardNumber = async (req, res) => {
  try {
    const wardNumber = req.params.wardNumber;
    // This returns a firebase query snapshot
    const bedsRef = db.collection("beds").where("wardNumber", "==", wardNumber);
    const beds = await bedsRef.get();

    if (beds.empty) {
      return res.status(404).send(`There are no bed in ${wardNumber}!`);
    }

    // Use forEach to loop through the returned query snapshot and push into
    // an array for my own return and sending
    const bedsArray = [];
    beds.forEach((doc) => {
      bedsArray.push(doc.data());
      console.log(doc.id, "=>", doc.data());
    });
    res.status(200).send(bedsArray);
  } catch (error) {
    console.error("Error fetching beds:", error);
    res.status(400).send(error.message);
  }
};

module.exports = {
  createBed,
  getBeds,
  getBed,
  getBedsByAssigned,
  getBedsByOccupied,
  getBedsByWardId,
  getBedsByWardNumber,
};
