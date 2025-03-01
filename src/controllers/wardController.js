const { getDB } = require("../config/firebase");

/**
 * I'm using the Node.js methods below found on the Firebase
 * Documentation because of readability but since the backend runs on Node.js
 * then perhaps some consistency might be better
 * https://firebase.google.com/docs/firestore/manage-data/add-data#node.js_1
 */

const db = getDB();

// CREATE
// I don't expect this to be used ever other than for testing
const createWard = async (req, res) => {
  try {
    const data = req.body;

    if (!data.id) throw new Error("req sent in has no ID/Name!");
    const wardsRef = db.collection("wards");
    const response = await wardsRef.doc(data.id).set(data);

    res
      .status(200)
      .send({ message: "Ward created successfully", response: response });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// READ ALL FACILITIES
const getWards = async (req, res) => {
  try {
    // This returns a firebase query snapshot
    const wardsRef = db.collection("wards");
    const wards = await wardsRef.get();

    if (wards.empty) {
      return res.status(404).send("No wards found");
    }

    // Use forEach to loop through the returned query snapshot and push into
    // an array for my own return and sending
    const wardsArray = [];
    wards.forEach((doc) => {
      wardsArray.push(doc.data());
      console.log(doc.id, "=>", doc.data());
    });

    res.status(200).send(wardsArray);
  } catch (error) {
    console.error("Error fetching wards:", error);
    res.status(500).send("Internal Server Error");
  }
};

// READ ONE FACILITY
const getWard = async (req, res) => {
  try {
    const id = req.params.wardId;
    // returns firestore + path
    const wardRef = db.collection("wards").doc(id);
    // returns some sort of object with data inside private _fieldsProto
    const ward = await wardRef.get();

    // You have to use exists when using collection().doc() as it returns only
    // ONE "object" as opposed to .empty where it's potentially more than one
    if (!ward.exists) res.status(404).send("Ward not found");
    res.status(200).send(ward.data());
  } catch (error) {
    console.error("Error fetching ward:", error);
    res.status(400).send(error.message);
  }
};

// FIND ALL FACILITIES BY NAME
const getWardsByFacilityId = async (req, res) => {
  try {
    const facilityId = req.params.facilityId;
    // This returns a firebase query snapshot
    const wardsRef = db
      .collection("wards")
      .where("facilityId", "==", facilityId);
    const wards = await wardsRef.get();

    // You have to use empty to check if there are any results returned when
    // expecting potentially more than one
    if (wards.empty) {
      return res
        .status(404)
        .send(`There are no wards under facility: ${facilityId}!`);
    }

    // Use forEach to loop through the returned query snapshot and push into
    // an array for my own return and sending
    const wardsArray = [];
    wards.forEach((doc) => {
      wardsArray.push(doc.data());
      console.log(doc.id, "=>", doc.data());
    });
    res.status(200).send(wardsArray);
  } catch (error) {
    console.error("Error fetching wards:", error);
    res.status(400).send(error.message);
  }
};

module.exports = {
  createWard,
  getWard,
  getWards,
  getWardsByFacilityId,
};
