import { firebaseApp } from "../config/firebase.js";
import Device from "../models/deviceModel.js";
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// I'll need to wrap this in a try-catch at some point
const db = getFirestore(firebaseApp);

/**
 * I'm using the Web Modular API methods below found on the Firebase
 * Documentation because of readability but since the backend runs on Node.js
 * then perhaps some consistency might be better
 * https://firebase.google.com/docs/firestore/manage-data/add-data
 */

// CREATE
const createDevice = async (req, res) => {
  try {
    const data = req.body;
    await addDoc(collection(db, "devices"), data);
    res.status(200).send("Device created successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// READ ALL
const getDevices = async (req, res) => {
  try {
    const devices = await getDocs(collection(db, "devices"));
    const deviceArray = [];

    if (devices.empty) {
      res.status(400).send("No Devices found");
    } else {
      devices.forEach((doc) => {
        const device = new Device(
          doc.id,
          doc.data().deviceId,
          doc.data().bedId,
          doc.data().deviceNumber,
          doc.data().lastMaintenance,
          doc.data().status,
          doc.data().typetype
        );
        deviceArray.push(device);
      });

      res.status(200).send(deviceArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// READ ONE
const getDevice = async (req, res) => {
  try {
    const id = req.params.deviceId;
    const device = doc(db, "devices", id);
    const docSnap = await getDoc(device);

    if (docSnap.exists()) {
      res.status(200).send(docSnap.data());
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
