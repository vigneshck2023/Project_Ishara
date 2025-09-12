const mongoose = require("mongoose");
require("dotenv").config();

const mongoUri = process.env.MONGODB;

const initializeDatabase = async () => {
  if (mongoose.connection.readyState === 1) {
    // Already connected
    console.log("Already connected to Database");
    return;
  }

  try {
    await mongoose.connect(mongoUri, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });
    console.log("Connected to Database Successfully");
  } catch (error) {
    console.error("Error connecting to Database:", error.message || error);
    throw error;
  }
};

module.exports = { initializeDatabase };
