const express = require("express");
const path = require("path");

const server = express();
const port = 8001;

// View engine setup
server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "views"));

// Middleware
server.use(express.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, "public")));

// Static array (books) with image property
let books = [
  {
     id: "1",
     title: "JavaScript Basics", 
     author: "Kyle Simpson",
      category: "Programming",
     image: "https://media.springernature.com/full/springer-static/cover-hires/book/978-1-4302-7218-2" 
    },
  { 
    id: "2", 
    title: "Clean Code",
    author: "Robert C. Martin", 
     category: "Software Engineering",
     image: "https://media.springernature.com/full/springer-static/cover-hires/book/979-8-8688-1411-2" 
    },
  { 
      id: "3", 
      title: "Atomic Habits",
      author: "James Clear",
    category: "Self Help",
      image: "https://www.irustima.com/wp-content/uploads/2025/01/atomic-habits-james-clear-irustima.jpg" 
    },
     { 
      id: "4", 
      title: "python",
      author: "mark lutz",
      category: "coding",
      image: "https://media.springernature.com/full/springer-static/cover-hires/book/978-1-4302-0072-7" 
    },
     { 
      id: "5", 
      title: "c",
      author: "denish richee",
      category: "coding",
      image: "https://m.media-amazon.com/images/I/619vFEd3EAL._UF1000,1000_QL80_.jpg" 
    },
     { 
      id: "6", 
      title: "story",
      author: "mark lutz",
      category: "reading",
      image: "https://popupkids.in/cdn/shop/products/9788131915592_1024x1024.jpg?v=1663658523" 
    },
     { 
      id: "7", 
      title: "herry potter",
      author: "J. K. Rowling",
      category: "story",
      image: "http://localhost/bookstore-main/uploaded_img/book7.jpg" 
    },
];

// Home Page - Show all books
server.get("/", (req, res) => {
  res.render("index", { books });
});

// Add Book Form
server.get("/add-book", (req, res) => {
  res.render("addbook");
});

// Add Book (POST)
server.post("/add-book", (req, res) => {
  books.push(req.body);
  return res.redirect("/");
});

// Delete Book
server.get("/delete-book/:id", (req, res) => {
  let id = req.params.id;
  books = books.filter(bk => bk.id != id);
  return res.redirect("/");
});

// Edit Book Form
server.get("/edit-book/:id", (req, res) => {
  let book = books.find(bk => bk.id == req.params.id);
  res.render("editbook", { book });
});

// Update Book (POST)
server.post("/edit-book/:id", (req, res) => {
  let id = req.params.id;
  books = books.map(bk => (bk.id == id ? { id, ...req.body } : bk));
  return res.redirect("/");
});

// Server Start
server.listen(port, () => {
  console.log(`Library App running at http://localhost:${port}`);
});

