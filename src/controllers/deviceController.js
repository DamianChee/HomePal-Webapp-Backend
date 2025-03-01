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

// READ ALL DEVICES
const getDevices = async (req, res) => {
  try {
    // This returns a firebase query snapshot
    const devicesRef = db.collection("devices");
    const devices = await devicesRef.get();

    if (devices.empty) {
      return res.status(404).send("No Devices found");
    }

    // Use forEach to loop through the returned query snapshot and push into
    // an array for my own return and sending
    const devicesArray = [];
    devices.forEach((doc) => {
      devicesArray.push(doc.data());
      console.log(doc.id, "=>", doc.data());
    });

    res.status(200).send(devicesArray);
  } catch (error) {
    console.error("Error fetching devices:", error);
    res.status(500).send("Internal Server Error");
  }
};

// READ ONE DEVICE
const getDevice = async (req, res) => {
  try {
    const id = req.params.deviceId;
    const deviceRef = db.collection("devices").doc(id);
    const device = await deviceRef.get();

    console.log(`DeviceRef: ${JSON.stringify(deviceRef)}`);
    console.log(`Device: ${JSON.stringify(device)}`);

    if (device.exists) {
      res.status(200).send(device.data());
    } else {
      res.status(404).send("Device not found");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// FIND ALL DEVICES BY STATUS (online/offline)
const getDevicesByStatus = async (req, res) => {
  try {
    const status = req.params.status;
    // This returns a firebase query snapshot
    const devicesRef = db.collection("devices").where("status", "==", status);
    const devices = await devicesRef.get();

    // You have to use .empty to check if there are any results returned
    if (devices.empty) {
      return res.status(404).send(`There are no ${status} devices!`);
    }

    // Use forEach to loop through the returned query snapshot and push into
    // an array for my own return and sending
    const devicesArray = [];
    devices.forEach((doc) => {
      devicesArray.push(doc.data());
      console.log(doc.id, "=>", doc.data());
    });
    res.status(200).send(devicesArray);
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
  getDevicesByStatus,
};
