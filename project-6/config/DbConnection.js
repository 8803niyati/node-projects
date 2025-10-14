// ./config/DbConnection.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect( "mongodb+srv://niyatidhanani:169416@cluster0.dkmvezt.mongodb.net/project-6");
    console.log("✅ MongoDB Connected...");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

module.exports = dbConnect;



