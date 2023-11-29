const request = require("supertest");
const app = require("../app");

const sampleClub = {
    "_id": "6556e6529146d56fa5a82d55",
    "clubName": "Biographical Bookworms",
    "host": "Benjamin King",
    "participants": "Benjamin King, Eliza Nakamura",
    "description": "A book club for those who love to read biographies, autobiographies, and memoirs",
    "startDate": "12-16-2022",
    "endDate": "",
    "createdAt": "12-16-2022",
    "updatedAt": "12-16-2022"
};

describe("Clubs Routes", () => {
    let clubId;

    it("should add a new club", async () => {
        const response = await request(app)
            .post("/clubs")
            .send(sampleClub);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("_id");
        clubId = response.body._id;
    });

    it("should get a club by ID", async () => {
        const response = await request(app).get(`/clubs/${clubId}`);
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject(sampleClub);
    });

    it("should update a club by ID", async () => {
        const updatedClub = {
            "clubName": "Updated Bookworms",
            "participants": "Updated Host, New Participant",
            "endDate": "12-31-2022",
            "updatedAt": "12-17-2022"
        };

        const response = await request(app)
            .put(`/clubs/${clubId}`)
            .send(updatedClub);

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            "_id": clubId,
            ...updatedClub
        });
    });

    it("should delete a club by ID", async () => {
        const response = await request(app).delete(`/clubs/${clubId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message", "Club deleted successfully");
    });
});