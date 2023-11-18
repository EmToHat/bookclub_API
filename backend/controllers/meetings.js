const { initDb } = require("../database/connection");
const Meeting = require("../models/meetings.js");
const { ObjectId } = require("mongodb");

const initCollection = async () => {
  try {
    const db = await initDb();
    if (!db) {
      throw new Error("Database connection not available.");
    }

    const collection = db.collection("meetingDetails");
    console.log("Collection initialized successfully.");
    return collection;
  } catch (error) {
    console.error("Error initializing collection:", error);
    throw error;
  }
};

//-----------------------------------

const getAllMeetingDetails = async (req, res) => {
  try {
    const collection = await initCollection();
    const meetingDetails = await collection.find().toArray();
    res.json(meetingDetails);
  } catch (error) {
    console.error("Error getting meeting details:", error);
    res.status(500).send("Internal Server Error");
  }
};

//-----------------------------------

// Function to get the database instance
const getDb = async () => {
  try {
    const db = await initDb();
    return db;
  } catch (error) {
    console.error("Error getting database:", error);
    throw error;
  }
};

// Function to get meeting details by ID
const getMeetingDetailsById = async (req, res) => {
  const meetingId = req.params.id;

  try {
    const db = await getDb();

    // Ensure the collection is retrieved from the database
    const collection = db.collection("meetingDetails");

    const meeting = await collection.findOne({ _id: new ObjectId(meetingId) }); // Corrigido aqui

    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }

    res.status(200).json(meeting);
  } catch (error) {
    console.error("Error fetching meeting details by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//-----------------------------------

// Function to create meeting details
async function createMeetingDetails(req, res) {
  await initCollection();

  try {
    const db = await initDb();

    const sanitizedMeetingData = {
      bookClub: req.body.bookClub,
      host: req.body.host,
      time: req.body.time,
      date: req.body.date,
      dayOfWeek: req.body.dayOfWeek,
      location: req.body.location,
      typeOfMeeting: req.body.typeOfMeeting,
      book: req.body.book,
    };

    const result = await db
      .collection("meetingDetails")
      .insertOne(sanitizedMeetingData);
    res.status(201).json({ insertedId: result.insertedId }); // Indique o sucesso e retorne o ID inserido
  } catch (err) {
    console.error("Error creating meeting details:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

//-----------------------------------

// Function to update meeting details by ID
const updateMeetingDetails = async (req, res) => {
  const meetingId = req.params.id;
  const updatedMeetingData = req.body;

  try {
    const db = await initDb();
    if (!ObjectId.isValid(meetingId)) {
      return res.status(400).json({ message: "Invalid meeting ID" });
    }

    const objectId = new ObjectId(meetingId);
    const result = await db
      .collection("meetingDetails")
      .updateOne({ _id: objectId }, { $set: updatedMeetingData });

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Meeting not found" });
    }

    res.status(200).json({ message: "Meeting details updated successfully" });
  } catch (error) {
    console.error("Error updating meeting details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//-----------------------------------

// Function to delete meeting details by ID
const deleteMeetingDetails = async (req, res) => {
  const meetingId = req.params.id;

  try {
    const db = await initDb();
    if (!ObjectId.isValid(meetingId)) {
      return res.status(400).json({ message: "Invalid meeting ID" });
    }

    const objectId = new ObjectId(meetingId);
    const result = await db
      .collection("meetingDetails")
      .deleteOne({ _id: objectId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Meeting not found" });
    }

    res.status(200).json({ message: "Meeting details deleted successfully" });
  } catch (error) {
    console.error("Error deleting meeting details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllMeetingDetails,
  getMeetingDetailsById,
  createMeetingDetails,
  updateMeetingDetails,
  deleteMeetingDetails,
};
