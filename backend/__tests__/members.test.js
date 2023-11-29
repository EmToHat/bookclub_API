const request = require("supertest");
const app = require("../app");

const sampleMember = {
    "_id": "6556e7ea9146d56fa5a82d5c",
    "firstName": "Amy",
    "lastName": "Jones",
    "email": "amy.jones@gmail.com",
    "phoneNumber": "555-555-1234",
    "username": "ajones",
    "password": "p@ssw0rd",
    "activeReader": "yes",
    "address": {
        "street": "123 Main St",
        "city": "Columbus",
        "state": "OH",
        "postalCode": "43004"
    },
    "favoriteGenres": "Historical Fiction, Fantasy",
    "createdAt": "06-23-2022",
    "updatedAt": "06-23-2022"
};

describe("Members Routes", () => {
    let memberId;

    it("should add a new member", async () => {
        const response = await request(app)
            .post("/members")
            .send(sampleMember);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("_id");
        memberId = response.body._id;
    });

    it("should get a member by ID", async () => {
        const response = await request(app).get(`/members/${memberId}`);
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject(sampleMember);
    });

    it("should update a member by ID", async () => {
        const updatedMember = {
            "firstName": "Updated",
            "lastName": "Member",
            "email": "updated.member@gmail.com",
            "updatedAt": "06-24-2022"
        };

        const response = await request(app)
            .put(`/members/${memberId}`)
            .send(updatedMember);

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            "_id": memberId,
            ...updatedMember
        });
    });

    it("should delete a member by ID", async () => {
        const response = await request(app).delete(`/members/${memberId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message", "Member deleted successfully");
    });
});