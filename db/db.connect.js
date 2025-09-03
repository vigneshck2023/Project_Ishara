const mongoose = require("mongoose");
require("dotenv").config();

const mongoUri = process.env.MONGODB;
console.log("MONGODB URI:", mongoUri);

const initializeDatabase = async () => {
  await mongoose.connect(mongoUri)
    .then(() => {
      console.log("Connected to Database Successfully");
    })
    .catch((error) => console.log("Error connecting to Database:", error));
};

module.exports = { initializeDatabase };
