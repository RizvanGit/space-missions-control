const request = require("supertest");
const { mongoConnect, mongoDisconnect } = require("../../services/mongo");

const app = require("../../app");
const { loadPlanetsData } = require("../../models/planets.model");

describe("Testing /planets API", () => {
  beforeAll(async () => {
    loadPlanetsData();
    await mongoConnect();
  });
  afterAll(async () => {
    await mongoDisconnect();
  });
  describe("Test GET /planets", () => {
    test("It should return response with 200 success", async () => {
      await request(app)
        .get("/planets")
        .expect("Content-Type", /json/)
        .expect(200);
    });

    test("Response array should not be empty", async () => {
      const response = await request(app)
        .get("/planets")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.body.length.toString()).not.toEqual("0");
    });
  });
});
