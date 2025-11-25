const mongoose = require("mongoose");
const dbconnect = async () => {
    try {
        await mongoose.connect("mongodb+srv://niyatidhanani:169416@cluster0.dkmvezt.mongodb.net/Admin-panel");
        console.log(" Database connected successfully...");
    } catch (err) {
        console.error(" Database Connection Error:", err.message);
    }
};
module.exports = dbconnect();
