import { doc, getDoc } from "firebase/firestore";
const { getDB } = require("../config/firebase");

/**
 * I'm using the Node.js methods below found on the Firebase
 * Documentation because of readability but since the backend runs on Node.js
 * then perhaps some consistency might be better
 * https://firebase.google.com/docs/firestore/manage-data/add-data#node.js_1
 */

const db = getDB();

// CREATE
const createDevice = async (req, res) => {
  try {
    const data = req.body;

    // Sanity checks
    if (!data.id) throw new Error("req sent in has no device ID/Name!");
    const devicesRef = db.collection("devices");
    const response = await devicesRef.doc(data.id).set(data);

    res
      .status(200)
      .send({ message: "Device created successfully", response: response });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// READ ALL
const getDevices = async (req, res) => {
  try {
    const devicesRef = db.collection("devices");
    const devices = await devicesRef.get();

    if (devices.empty) {
      return res.status(404).send("No Devices found");
    }

    const deviceArray = devices.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).send(deviceArray);
  } catch (error) {
    console.error("Error fetching devices:", error);
    res.status(500).send("Internal Server Error");
  }
};

// READ ONE
const getDevice = async (req, res) => {
  try {
    const id = req.params.deviceId;
    const deviceRef = db.collection("devices").doc(id);
    const device = await deviceRef.get();

    if (device.exists()) {
      res.status(200).send(device.data());
    } else {
      res.status(404).send("Example not found");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Don't use or make these first to ensure I don't mess up the database
// - Damian

// // UPDATE
// const updateExample = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const data = req.body;
//     const example = doc(db, "devices", id);
//     await updateDoc(example, data);
//     res.status(200).send("Example updated successfully");
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// };

// // DELETE
// const deleteExample = async (req, res) => {
//   try {
//     const id = req.params.id;
//     await deleteDoc(doc(db, "devices", id));
//     res.status(200).send("Example deleted successfully");
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// };

module.exports = {
  createDevice,
  getDevice,
  getDevices,
};
