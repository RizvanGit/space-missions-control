const request = require("supertest");
const { mongoConnect, mongoDisconnect } = require("../../services/mongo")
const {loadPlanetsData} = require("../../models/planets.model")

const app = require("../../app");

const launchesPath = "/v1/launches"

describe('Launches API', () => {

  beforeAll(async () => {
    await mongoConnect();
    await loadPlanetsData();
  });
  afterAll(async () => {
    await mongoDisconnect();
  });
  
  
  describe(`Test GET ${launchesPath}`, () => {
    test("It should respond with 200 success", async () => {
      await request(app)
      .get(launchesPath)
      .expect("Content-Type", /json/)
      .expect(200);
    });
  });

  describe(`Test POST ${launchesPath}`, () => {
    const completeLaunchData = {
      mission: "Discovering Planet for test",
      rocket: "Super Test Rocket",
      destination: "Kepler-1410 b",
      launchDate: "July 30, 2033",
    };

    const launchDataWithoutDate = {
      mission: "Discovering Planet for test",
      rocket: "Super Test Rocket",
      destination: "Kepler-1410 b",
    };

    const launchDataWithInvalidDate = {
      mission: "Discovering Planet for test",
      rocket: "Super Test Rocket",
      destination: "Kepler-1410 b",
      launchDate: "value that can not be converted to date"
    };

    test("It should respond with 201 created", async () => {
      const response = await request(app)
        .post(launchesPath)
        .send(completeLaunchData)
        .expect("Content-Type", /json/)
        .expect(201);

      const requestDate = new Date(completeLaunchData.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();
      expect(responseDate).toBe(requestDate);

      expect(response.body).toMatchObject(launchDataWithoutDate);
    });

    test("It should catch missing required properties", async () => {
      const response = await request(app)
        .post(launchesPath)
        .send(launchDataWithoutDate)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "Missing required launch property",
      });
    });

    test("It should catch invalid dates", async () => {
      const response = await request(app)
        .post(launchesPath)
        .send(launchDataWithInvalidDate)
        .expect("Content-Type", /json/)
        .expect(404);

      expect(response.body).toStrictEqual({
        error: "Invalid launch date",
      });
    });
  });
})
