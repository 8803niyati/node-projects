const express = require("express");
const path = require("path");
const connectDB = require("./config/db");
const movieRoutes = require("./routes/movie.routes");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", movieRoutes);

connectDB();

const PORT = 8032;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
