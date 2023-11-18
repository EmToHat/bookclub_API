//clubs controllers
const mongodb = require("../database/connection");
const Club = require("../models/clubs.js");
const { ObjectId } = require("mongodb");

// Get all clubs
const getAllClubs = async (req, res) => {
    try {
        await mongodb.initDb();

        const db = mongodb.getDb();
        const clubsCollection = db.collection("clubs");
        const clubs = await clubsCollection.find().toArray();

        res.json(clubs);
    } catch (error) {
        console.error("Error getting clubs:", error);
        res.status(500).send("Internal Server Error");
    }
};

// Get club by ID
const findClubById = async (req, res) => {
    try {
        const clubId = req.params.id;
        console.log("Club ID:", clubId);

        const db = mongodb.getDb();
        const clubsCollection = db.collection("clubs");

        const response = await clubsCollection.findOne({
        _id: new ObjectId(clubId),
        });

        res.setHeader("Content-Type", "application/json");
        res.status(200).json(response);
    } catch (error) {
        console.error("Error finding club by ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Add a new club
const addClub = async (req, res) => {
    try {
        const clubData = req.body;

        if (!clubData.participants || !Array.isArray(clubData.participants)) {
        clubData.participants = [];
        }

        const db = await mongodb.initDb(); // Ensure that the database is properly initialized
        const clubsCollection = db.collection("clubs");

        const result = await clubsCollection.insertOne(clubData);

        if (result.acknowledged) {
        const newClub = {
            _id: result.insertedId,
            ...clubData,
        };
        res.status(201).json(newClub);
        } else {
        console.error("Failed to add club to the database:", result);
        res.status(500).json({ message: "Failed to add club to the database" });
        }
    } catch (error) {
        console.error("Error adding club:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update a club by ID
const updateClub = async (req, res) => {
    try {
        await mongodb.initDb(); // Ensure the database is initialized

        const clubId = req.params.id;
        const updatedClubData = req.body;

        // Convert participants to array if it's a string
        if (typeof updatedClubData.participants === "string") {
        updatedClubData.participants = updatedClubData.participants
            .split(",")
            .map((participant) => participant.trim());
        }

        const db = mongodb.getDb();
        const clubsCollection = db.collection("clubs");

        const response = await clubsCollection.updateOne(
        { _id: new ObjectId(clubId) },
        { $set: updatedClubData }
        );

        if (response.modifiedCount > 0) {
        res.status(204).send();
        } else {
        res.status(404).json({ message: "Club not found" });
        }
    } catch (error) {
        console.error("Error updating club:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Delete a club by ID
const deleteClub = async (req, res) => {
    try {
        const clubId = req.params.id;

        const db = mongodb.getDb();
        const clubsCollection = db.collection("clubs");

        const response = await clubsCollection.deleteOne({
        _id: new ObjectId(clubId),
        });

        if (response.deletedCount > 0) {
        console.log(`Club with ID ${clubId} deleted successfully`);
        res.status(204).send();
        } else {
        res.status(404).json({ message: "Club not found" });
        }
    } catch (error) {
        console.error("Error deleting club:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    getAllClubs,
    findClubById,
    addClub,
    updateClub,
    deleteClub,
};
