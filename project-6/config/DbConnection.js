const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect("mongodb+srv://niyatidhanani:169416@cluster0.dkmvezt.mongodb.net/Admin-panel");
    console.log("Database Connected Successfully");
  } catch (err) {
    console.error("Database Connection Failed:", err);
  }
};

module.exports = dbConnect;
