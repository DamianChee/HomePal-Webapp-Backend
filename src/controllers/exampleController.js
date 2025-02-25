import { admin } from "../firebase.js";
import Example from "../models/exampleModel.js";
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
const db = admin.firestore();

/**
 * I'm using the Web Modular API methods below found on the Firebase
 * Documentation because of readability but since the backend runs on Node.js
 * then perhaps some consistency might be better
 * https://firebase.google.com/docs/firestore/manage-data/add-data
 */

// CREATE
export const createExample = async (req, res, next) => {
  try {
    const data = req.body;
    await addDoc(collection(db, "examples"), data);
    res.status(200).send("Example created successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// READ ALL
export const getExamples = async (req, res, next) => {
  try {
    const examples = await getDocs(collection(db, "examples"));
    const exampleArray = [];

    if (examples.empty) {
      res.status(400).send("No Examples found");
    } else {
      examples.forEach((doc) => {
        const example = new Example(
          doc.id,
          doc.data().name,
          doc.data().price,
          doc.data().retailer,
          doc.data().amountInStock
        );
        exampleArray.push(example);
      });

      res.status(200).send(exampleArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// READ ONE
export const getExample = async (req, res, next) => {
  try {
    const id = req.params.id;
    const example = doc(db, "examples", id);
    const data = await getDoc(example);

    if (data.exists()) {
      res.status(200).send(data.data());
    } else {
      res.status(404).send("Example not found");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// UPDATE
export const updateExample = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const example = doc(db, "examples", id);
    await updateDoc(example, data);
    res.status(200).send("Example updated successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// DELETE
export const deleteExample = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteDoc(doc(db, "examples", id));
    res.status(200).send("Example deleted successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
