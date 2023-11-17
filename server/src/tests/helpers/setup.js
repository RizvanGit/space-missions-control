const {mongoConnect, mongoDisconect} = require("../../services/mongo")

beforeAll(async (done) => {
  global.__APP__ = await mongoConnect() 
  done();
})

afterAll(async (done) => {
  await mongoDisconect();
  global.__APP__ = undefined;
  done();
})
