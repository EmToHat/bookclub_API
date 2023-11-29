const request = require("supertest");
const app = require("../app");

const sampleMeeting = {
    "_id": "6556e6db9146d56fa5a82d57",
    "bookClub": "Literary Ladies",
    "host": "Amy Jones",
    "time": "7:30 pm",
    "date": "11-14-2023",
    "dayOfWeek": "Tuesday",
    "location": "Columbus Public Library",
    "typeOfMeeting": "in-person",
    "book": "The London House",
    "createdAt": "10-14-2023",
    "updatedAt": "10-14-2023"
};

describe("Meetings Routes", () => {
    let meetingId;

    it("should add a new meeting", async () => {
        const response = await request(app)
            .post("/meetings")
            .send(sampleMeeting);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("_id");
        meetingId = response.body._id;
    });

    it("should get a meeting by ID", async () => {
        const response = await request(app).get(`/meetings/${meetingId}`);
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject(sampleMeeting);
    });

    it("should update a meeting by ID", async () => {
        const updatedMeeting = {
            "bookClub": "Updated Book Club",
            "host": "Updated Host",
            "time": "8:00 pm",
            "updatedAt": "10-15-2023"
        };

        const response = await request(app)
            .put(`/meetings/${meetingId}`)
            .send(updatedMeeting);

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            "_id": meetingId,
            ...updatedMeeting
        });
    });

    it("should delete a meeting by ID", async () => {
        const response = await request(app).delete(`/meetings/${meetingId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message", "Meeting deleted successfully");
    });
});