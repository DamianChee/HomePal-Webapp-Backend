const { getDB } = require("../config/firebase");
const parseBoolean = require("../utils/parseBoolean");
const formatFirebaseTimestamp = require("../utils/formatFirebaseTimestamp");

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

    res.status(200).json({ status: "ok", msg: "Event Created", response });
  } catch (error) {
    res.status(500).json({ status: "error", msg: error.message });
  }
};

// READ ALL EVENTS
const getEvents = async (req, res) => {
  try {
    // This returns a firebase query snapshot
    const eventsRef = db.collection("events");
    const events = await eventsRef.get();

    if (events.empty) {
      return res.status(404).json({ status: "error", msg: "No Events found" });
    }

    // Use forEach to loop through the returned query snapshot and push into
    // an array for my own return and sending
    const eventsArray = [];
    events.forEach((doc) => {
      eventsArray.push(doc.data());
      console.log(doc.id, "=>", doc.data());
    });

    res.status(200).json({
      status: "ok",
      msg: "Returning all event",
      response: eventsArray,
    });
  } catch (error) {
    res.status(500).json({ status: "error", msg: error.message });
  }
};

// READ ONE EVENT
const getEvent = async (req, res) => {
  try {
    const id = req.params.eventId;
    // returns firestore + path
    const eventRef = db.collection("events").doc(id);
    // returns some sort of object with data inside private _fieldsProto
    const event = await eventRef.get();

    // You have to use exists when using collection().doc() as it returns only
    // ONE "object" as opposed to .empty where it's potentially more than one
    if (!event.exists)
      return res.status(404).json({ status: "error", msg: "No Events found" });
    res.status(200).json({
      status: "ok",
      msg: "Returning event",
      response: event.data(),
    });
  } catch (error) {
    res.status(500).json({ status: "error", msg: error.message });
  }
};

// FIND ALL EVENTS BY DEVICE ID
const getEventsByDeviceId = async (req, res) => {
  try {
    const deviceId = req.params.deviceId;
    // This returns a firebase query snapshot
    const eventsRef = db.collection("events").where("deviceId", "==", deviceId);
    const events = await eventsRef.get();

    // You have to use empty to check if there are any results returned when
    // expecting potentially more than one
    if (events.empty) {
      return res.status(404).json({
        status: "error",
        msg: `There are no events for: ${deviceId}!`,
      });
    }

    // Use forEach to loop through the returned query snapshot and push into
    // an array for my own return and sending
    const eventsArray = [];
    events.forEach((doc) => {
      eventsArray.push(doc.data());
      console.log(doc.id, "=>", doc.data());
    });
    res.status(200).json({
      status: "ok",
      msg: "Returning event",
      response: eventsArray,
    });
  } catch (error) {
    res.status(500).json({ status: "error", msg: error.message });
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
      return res.status(404).json({
        status: "error",
        msg: `There are no ${handled ? "handled" : "unhandled"} events!`,
      });
    }

    // Use forEach to loop through the returned query snapshot and push into
    // an array for my own return and sending
    const eventsArray = [];
    events.forEach((doc) => {
      eventsArray.push(doc.data());
      console.log(doc.id, "=>", doc.data());
    });
    res.status(200).json({
      status: "ok",
      msg: "Returning event",
      response: eventsArray,
    });
  } catch (error) {
    res.status(500).json({ status: "error", msg: error.message });
  }
};

// FIND ALL EVENTS BY ACTION (true/false)
const getEventsByAction = async (req, res) => {
  try {
    const action = req.params.action;
    // This returns a firebase query snapshot
    const eventsRef = db.collection("events").where("action", "==", action);
    const events = await eventsRef.get();

    // You have to use .empty to check if there are any results returned
    if (events.empty) {
      return res.status(404).json({
        status: "error",
        msg: `There are no ${action} events!`,
      });
    }

    // Use forEach to loop through the returned query snapshot and push into
    // an array for my own return and sending
    const eventsArray = [];
    events.forEach((doc) => {
      eventsArray.push(doc.data());
      console.log(doc.id, "=>", doc.data());
    });
    res.status(200).json({
      status: "ok",
      msg: "Returning event",
      response: eventsArray,
    });
  } catch (error) {
    res.status(500).json({ status: "error", msg: error.message });
  }
};

const getLatestEvents = async (req, res) => {
  try {
    // Get the snapshot
    const eventsRef = db.collection("events").orderBy("time", "desc").limit(40);
    const events = await eventsRef.get();

    // Handle empty result case
    if (events.empty) {
      return res.status(404).json({
        status: "error",
        msg: "There are no events!",
      });
    }

    // Convert snapshot to array
    const eventsArray = [];
    events.forEach((doc) => {
      const eventData = doc.data();
      // Format the timestamp here
      eventData.time = formatFirebaseTimestamp(eventData.time);
      eventsArray.push(eventData);
      console.log(doc.id, "=>", eventData);
    });

    // Return successful response
    res.status(200).json({
      status: "ok",
      msg: "Returning latest events",
      response: eventsArray,
    });
  } catch (error) {
    res.status(500).json({ status: "error", msg: error.message });
  }
};

const getRecentEvents = async (req, res) => {
  try {
    // Create Date objects for comparison
    const now = new Date();
    const thirtyDaysAgo = new Date(now);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const eventsRef = db
      .collection("events")
      .where("time", ">=", thirtyDaysAgo)
      .orderBy("time", "desc")
      .limit(40);

    const events = await eventsRef.get();
    if (events.empty) {
      return res.status(404).json({
        status: "error",
        msg: "No events found in the specified timeframe",
        debug: {
          startDate: thirtyDaysAgo.toISOString(),
          endDate: now.toISOString(),
        },
      });
    }

    const eventsArray = events.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      time: doc.data().time.toDate().toISOString(),
    }));

    res.status(200).json({
      status: "ok",
      msg: "Events retrieved successfully",
      count: eventsArray.length,
      response: eventsArray,
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(error.status || 500).json({
      status: "error",
      msg: error.message,
    });
  }
};

module.exports = {
  createEvent,
  getEvent,
  getEvents,
  getEventsByDeviceId,
  getEventsByHandled,
  getEventsByAction,
  getLatestEvents,
  getRecentEvents,
};
