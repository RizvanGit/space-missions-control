const { mongoConnect, mongoDisconnect } = require("../../services/mongo");

describe("Running server", () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });
  test("empty", () => {
    const someString = "abc"
    expect(someString).toEqual("abc")
  })
});
