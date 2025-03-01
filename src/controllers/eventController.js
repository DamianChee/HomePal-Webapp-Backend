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
const createEvent = async (req, res) => {
  try {
    const data = req.body;

    if (!data.id) throw new Error("req sent in has no ID/Name!");
    const eventsRef = db.collection("events");
    const response = await eventsRef.doc(data.id).set(data);

    res
      .status(200)
      .send({ message: "Event created successfully", response: response });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// READ ALL DEVICES
const getEvents = async (req, res) => {
  try {
    // This returns a firebase query snapshot
    const eventsRef = db.collection("events");
    const events = await eventsRef.get();

    if (events.empty) {
      return res.status(404).send("No Events found");
    }

    // Use forEach to loop through the returned query snapshot and push into
    // an array for my own return and sending
    const eventsArray = [];
    events.forEach((doc) => {
      eventsArray.push(doc.data());
      console.log(doc.id, "=>", doc.data());
    });

    res.status(200).send(eventsArray);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).send("Internal Server Error");
  }
};

// READ ONE DEVICE
const getEvent = async (req, res) => {
  try {
    const id = req.params.eventId;
    // returns firestore + path
    const eventRef = db.collection("events").doc(id);
    // returns some sort of object with data inside private _fieldsProto
    const event = await eventRef.get();

    // You have to use exists when using collection().doc() as it returns only
    // ONE "object" as opposed to .empty where it's potentially more than one
    if (!event.exists) res.status(404).send("Event not found");
    res.status(200).send(event.data());
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(400).send(error.message);
  }
};

// FIND ALL EVENTS BY HANDLED (true/false)
const getEventsByDeviceId = async (req, res) => {
  try {
    const deviceId = req.params.deviceId;
    // This returns a firebase query snapshot
    const eventsRef = db.collection("events").where("deviceId", "==", deviceId);
    const events = await eventsRef.get();

    // You have to use empty to check if there are any results returned when
    // expecting potentially more than one
    if (events.empty) {
      return res.status(404).send(`There are no events for: ${deviceId}!`);
    }

    // Use forEach to loop through the returned query snapshot and push into
    // an array for my own return and sending
    const eventsArray = [];
    events.forEach((doc) => {
      eventsArray.push(doc.data());
      console.log(doc.id, "=>", doc.data());
    });
    res.status(200).send(eventsArray);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(400).send(error.message);
  }
};

// FIND ALL EVENTS BY HANDLED (true/false)
const getEventsByHandled = async (req, res) => {
  try {
    const handled = parseBoolean(req.params.handled);
    // This returns a firebase query snapshot
    const eventsRef = db.collection("events").where("isHandled", "==", handled);
    const events = await eventsRef.get();

    // You have to use .empty to check if there are any results returned
    if (events.empty) {
      return res.status(404).send(`There are no ${status} devices!`);
    }

    // Use forEach to loop through the returned query snapshot and push into
    // an array for my own return and sending
    const eventsArray = [];
    events.forEach((doc) => {
      eventsArray.push(doc.data());
      console.log(doc.id, "=>", doc.data());
    });
    res.status(200).send(eventsArray);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(400).send(error.message);
  }
};

module.exports = {
  createEvent,
  getEvent,
  getEvents,
  getEventsByDeviceId,
  getEventsByHandled,
};
