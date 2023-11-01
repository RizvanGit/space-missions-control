const request = require("supertest")

const app = require("../../app")
const {loadPlanetsData} = require("../../models/planets.model")

beforeAll(() => {
  return loadPlanetsData()
})

describe("Test GET /planets", () => {

  test("It should return response with 200 success", async() => {
    await request(app)
      .get('/planets')
      .expect('Content-Type', /json/)
      .expect(200)
  }) 
  
  test("Response array should not be empty", async () => {
    const response = await request(app)
      .get('/planets')
      .set('Accept', 'application/json')
      .expect("Content-Type", /json/);
    
    expect(response.body.length.toString()).not.toEqual("0")
  })
})
