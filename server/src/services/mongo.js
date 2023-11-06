const mongoose = require("mongoose")

const MONGO_URL = "mongodb+srv://nasa-api:nobq9rYNllguZAPJ@cluster0.yfjofjv.mongodb.net/?retryWrites=true&w=majority"

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!')
})
mongoose.connection.on('error', (err) => {
  console.error(err)
})

async function mongoConnect() {
 return await mongoose.connect(MONGO_URL)
}

module.exports = {
  mongoConnect
}