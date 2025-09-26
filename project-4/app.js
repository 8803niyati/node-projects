const express = require("express");
const port = 8005;

const app = express();
const dbConnection = require("./config/dbConnection");
const bookModel = require("./model/book.model");

// Set view engine
app.set("view engine", "ejs");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* ---------------- ROUTES ---------------- */

// Home → Show all books
app.get("/", async (req, res) => {
  let books = await bookModel.find();
  return res.render("index", { books });
});

// Add new book
app.post("/add-book", async (req, res) => {
  let bookData = req.body;

  if (!bookData.title || !bookData.author) {
    console.log("Missing required fields");
    return res.redirect("/");
  }

  await bookModel.create(bookData);
  console.log("Book added successfully");
  return res.redirect("/");
});
// Add book form page
app.get("/add-book", (req, res) => {
  return res.render("add-book");
});


// Delete book
app.get("/delete-book/:id", async (req, res) => {
  let id = req.params.id;
  let book = await bookModel.findById(id);
  if (!book) {
    console.log("Book not found");
    return res.redirect("/");
  }
  await bookModel.findByIdAndDelete(id);
  console.log("Delete success");
  return res.redirect("/");
});

// Edit book form
app.get("/edit-book/:id", async (req, res) => {
  let id = req.params.id;
  let book = await bookModel.findById(id);
  if (!book) {
    console.log("Book not found");
    return res.redirect("/");
  }
  return res.render("edit-book", { book });
});

// Update book
app.post("/update-book/:id", async (req, res) => {
  let id = req.params.id;
  let book = await bookModel.findById(id);
  if (!book) {
    console.log("Book not found");
    return res.redirect("/");
  }

  let bookData = req.body;

  await bookModel.findByIdAndUpdate(id, bookData, { new: true });
  console.log("Update success");
  return res.redirect("/");
});

/* ---------------- START SERVER ---------------- */
app.listen(port, () => {
  dbConnection();
  console.log(`Server running at http://localhost:${port}`);
});
