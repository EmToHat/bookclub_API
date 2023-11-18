// members.js
const { ObjectId } = require("mongodb");
const { getDb } = require("../database/connection");
const Member = require("../models/members.js");

// Function to get all members
const getAllMembers = async (req, res) => {
    try {
        const db = getDb();
        const members = await db.collection("members").find().toArray();
        res.json(members);
    } catch (error) {
        console.error("Error getting members:", error);
        res.status(500).send("Internal Server Error");
    }
};

// Function to get member by ID
const getMemberById = async (req, res) => {
    const memberId = req.params.id;

    try {
        const db = getDb();
        const member = await db
        .collection("members")
        .findOne({ _id: ObjectId(memberId) });

        if (!member) {
        return res.status(404).json({ message: "Member not found" });
        }

        res.status(200).json(member);
    } catch (error) {
        console.error("Error fetching member by ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Function to create member
const createMember = async (req, res) => {
    const memberData = req.body;

    try {
        const db = getDb();
        const result = await db.collection("members").insertOne(memberData);
        res
        .status(201)
        .json({
            message: "Member created successfully",
            memberId: result.insertedId,
        });
    } catch (error) {
        console.error("Error creating member:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Function to update member by ID
const updateMember = async (req, res) => {
    const memberId = req.params.id;
    const updatedMemberData = req.body;

    try {
        const db = getDb();
        if (!ObjectId.isValid(memberId)) {
        return res.status(400).json({ message: "Invalid member ID" });
        }

        const objectId = new ObjectId(memberId);
        const result = await db
        .collection("members")
        .updateOne({ _id: objectId }, { $set: updatedMemberData });

        if (result.modifiedCount === 0) {
        return res.status(404).json({ message: "Member not found" });
        }

        res.status(200).json({ message: "Member updated successfully" });
    } catch (error) {
        console.error("Error updating member:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Function to delete member by ID
const deleteMember = async (req, res) => {
    const memberId = req.params.id;

    try {
        const db = getDb();
        if (!ObjectId.isValid(memberId)) {
        return res.status(400).json({ message: "Invalid member ID" });
        }

        const objectId = new ObjectId(memberId);
        const result = await db.collection("members").deleteOne({ _id: objectId });

        if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Member not found" });
        }

        res.status(200).json({ message: "Member deleted successfully" });
    } catch (error) {
        console.error("Error deleting member:", error);
        res.status(500).json({ message: "Internal server error" });
    } 
};

module.exports = {
    getAllMembers,
    getMemberById,
    createMember,
    updateMember,
    deleteMember,
};
