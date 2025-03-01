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
const createOrganization = async (req, res) => {
  try {
    const data = req.body;

    if (!data.id) throw new Error("req sent in has no ID/Name!");
    const organizationsRef = db.collection("organizations");
    const response = await organizationsRef.doc(data.id).set(data);

    res.status(200).send({
      message: "Organization created successfully",
      response: response,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// READ ALL ORGANIZATIONS
const getOrganizations = async (req, res) => {
  try {
    // This returns a firebase query snapshot
    const organizationsRef = db.collection("organizations");
    const organizations = await organizationsRef.get();

    if (organizations.empty) {
      return res.status(404).send("No organizations found");
    }

    // Use forEach to loop through the returned query snapshot and push into
    // an array for my own return and sending
    const organizationsArray = [];
    organizations.forEach((doc) => {
      organizationsArray.push(doc.data());
      console.log(doc.id, "=>", doc.data());
    });

    res.status(200).send(organizationsArray);
  } catch (error) {
    console.error("Error fetching organizations:", error);
    res.status(500).send("Internal Server Error");
  }
};

// READ ONE ORGANIZATION
const getOrganization = async (req, res) => {
  try {
    const id = req.params.organizationId;
    // returns firestore + path
    const organizationRef = db.collection("organizations").doc(id);
    // returns some sort of object with data inside private _fieldsProto
    const organization = await organizationRef.get();

    // You have to use exists when using collection().doc() as it returns only
    // ONE "object" as opposed to .empty where it's potentially more than one
    if (!organization.exists) res.status(404).send("Organization not found");
    res.status(200).send(organization.data());
  } catch (error) {
    console.error("Error fetching organization:", error);
    res.status(400).send(error.message);
  }
};

// FIND ALL ORGANIZATIONS BY NAME (true/false)
const getOrganizationsByName = async (req, res) => {
  try {
    const name = req.params.name;
    // This returns a firebase query snapshot
    const organizationsRef = db
      .collection("organizations")
      .where("orgName", "==", name);
    const organizations = await organizationsRef.get();

    // You have to use empty to check if there are any results returned when
    // expecting potentially more than one
    if (organizations.empty) {
      return res.status(404).send(`There are no organizations named: ${name}!`);
    }

    // Use forEach to loop through the returned query snapshot and push into
    // an array for my own return and sending
    const organizationsArray = [];
    organizations.forEach((doc) => {
      organizationsArray.push(doc.data());
      console.log(doc.id, "=>", doc.data());
    });
    res.status(200).send(organizationsArray);
  } catch (error) {
    console.error("Error fetching organizations:", error);
    res.status(400).send(error.message);
  }
};

// FIND ALL ORGANIZATION BY CONTACT INFO
const getOrganizationsByContactInfo = async (req, res) => {
  try {
    const contact = req.params.contact;
    // This returns a firebase query snapshot
    const organizationsRef = db
      .collection("organizations")
      .where("contactInfo", "==", contact);
    const organizations = await organizationsRef.get();

    // You have to use .empty to check if there are any results returned
    if (organizations.empty) {
      return res
        .status(404)
        .send(`There are no organizations with the contact: ${contact}!`);
    }

    // Use forEach to loop through the returned query snapshot and push into
    // an array for my own return and sending
    const organizationsArray = [];
    organizations.forEach((doc) => {
      organizationsArray.push(doc.data());
      console.log(doc.id, "=>", doc.data());
    });
    res.status(200).send(organizationsArray);
  } catch (error) {
    console.error("Error fetching organizations:", error);
    res.status(400).send(error.message);
  }
};

module.exports = {
  createOrganization,
  getOrganization,
  getOrganizations,
  getOrganizationsByName,
  getOrganizationsByContactInfo,
};
