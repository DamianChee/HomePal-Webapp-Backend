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
const createFacility = async (req, res) => {
  try {
    const data = req.body;

    if (!data.id) throw new Error("req sent in has no ID/Name!");
    const facilitiesRef = db.collection("facilities");
    const response = await eventsRef.doc(data.id).set(data);

    res
      .status(200)
      .send({ message: "Facility created successfully", response: response });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// READ ALL FACILITIES
const getFacilities = async (req, res) => {
  try {
    // This returns a firebase query snapshot
    const facilitiesRef = db.collection("facilities");
    const facilities = await facilitiesRef.get();

    if (facilities.empty) {
      return res.status(404).send("No facilities found");
    }

    // Use forEach to loop through the returned query snapshot and push into
    // an array for my own return and sending
    const facilitiesArray = [];
    facilities.forEach((doc) => {
      facilitiesArray.push(doc.data());
      console.log(doc.id, "=>", doc.data());
    });

    res.status(200).send(facilitiesArray);
  } catch (error) {
    console.error("Error fetching facilities:", error);
    res.status(500).send("Internal Server Error");
  }
};

// READ ONE FACILITY
const getFacility = async (req, res) => {
  try {
    const id = req.params.facilityId;
    // returns firestore + path
    const facilityRef = db.collection("facilities").doc(id);
    // returns some sort of object with data inside private _fieldsProto
    const facility = await facilityRef.get();

    // You have to use exists when using collection().doc() as it returns only
    // ONE "object" as opposed to .empty where it's potentially more than one
    if (!facility.exists) res.status(404).send("Facility not found");
    res.status(200).send(facility.data());
  } catch (error) {
    console.error("Error fetching facility:", error);
    res.status(400).send(error.message);
  }
};

// FIND ALL FACILITIES BY NAME
const getFacilitiesByName = async (req, res) => {
  try {
    const name = req.params.name;
    // This returns a firebase query snapshot
    const facilitiesRef = db
      .collection("facilities")
      .where("facilityName", "==", name);
    const facilities = await facilitiesRef.get();

    // You have to use empty to check if there are any results returned when
    // expecting potentially more than one
    if (facilities.empty) {
      return res.status(404).send(`There are no facility named: ${name}!`);
    }

    // Use forEach to loop through the returned query snapshot and push into
    // an array for my own return and sending
    const facilitiesArray = [];
    facilities.forEach((doc) => {
      facilitiesArray.push(doc.data());
      console.log(doc.id, "=>", doc.data());
    });
    res.status(200).send(facilitiesArray);
  } catch (error) {
    console.error("Error fetching facilities:", error);
    res.status(400).send(error.message);
  }
};

// FIND ALL FACILITIES BY ORGANIZATION ID
const getFacilitiesByOrganizationId = async (req, res) => {
  try {
    const id = req.params.organizationId;
    // This returns a firebase query snapshot
    const facilitiesRef = db
      .collection("facilities")
      .where("organizationId", "==", id);
    const facilities = await facilitiesRef.get();

    // You have to use .empty to check if there are any results returned
    if (facilities.empty) {
      return res
        .status(404)
        .send(`There is no facilities with the organization id: ${id}!`);
    }

    // Use forEach to loop through the returned query snapshot and push into
    // an array for my own return and sending
    const facilitiesArray = [];
    facilities.forEach((doc) => {
      facilitiesArray.push(doc.data());
      console.log(doc.id, "=>", doc.data());
    });
    res.status(200).send(facilitiesArray);
  } catch (error) {
    console.error("Error fetching facilities:", error);
    res.status(400).send(error.message);
  }
};

// FIND ALL FACILITIES BY TYPE
const getFacilitiesByType = async (req, res) => {
  try {
    const type = req.params.type;
    // This returns a firebase query snapshot
    const facilitiesRef = db.collection("facilities").where("type", "==", type);
    const facilities = await facilitiesRef.get();

    // You have to use .empty to check if there are any results returned
    if (facilities.empty) {
      return res
        .status(404)
        .send(`There are no facilities with the type: ${type}!`);
    }

    // Use forEach to loop through the returned query snapshot and push into
    // an array for my own return and sending
    const facilitiesArray = [];
    facilities.forEach((doc) => {
      facilitiesArray.push(doc.data());
      console.log(doc.id, "=>", doc.data());
    });
    res.status(200).send(facilitiesArray);
  } catch (error) {
    console.error("Error fetching facilities:", error);
    res.status(400).send(error.message);
  }
};

// FIND ALL FACILITIES BY CONTACT INFO
const getFacilitiesByContactInfo = async (req, res) => {
  try {
    const contact = req.params.contact;
    // This returns a firebase query snapshot
    const facilitiesRef = db
      .collection("facilities")
      .where("contactInfo", "==", contact);
    const facilities = await facilitiesRef.get();

    // You have to use .empty to check if there are any results returned
    if (facilities.empty) {
      return res
        .status(404)
        .send(`There are no facilities with the contact: ${contact}!`);
    }

    // Use forEach to loop through the returned query snapshot and push into
    // an array for my own return and sending
    const facilitiesArray = [];
    facilities.forEach((doc) => {
      facilitiesArray.push(doc.data());
      console.log(doc.id, "=>", doc.data());
    });
    res.status(200).send(facilitiesArray);
  } catch (error) {
    console.error("Error fetching facilities:", error);
    res.status(400).send(error.message);
  }
};

module.exports = {
  createFacility,
  getFacility,
  getFacilities,
  getFacilitiesByName,
  getFacilitiesByOrganizationId,
  getFacilitiesByType,
  getFacilitiesByContactInfo,
};
