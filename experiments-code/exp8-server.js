const express = require("express");
const app = express();

app.use(express.json());

let books = [
  { id: 1, title: "The Alchemist", author: "Paulo Coelho" },
  { id: 2, title: "Atomic Habits", author: "James Clear" },
  { id: 3, title: "Clean Code", author: "Robert C. Martin" }
];

// READ all books
app.get("/books", (req, res) => {
  res.json(books);
});

// READ one book
app.get("/books/:id", (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
});

// CREATE a book
app.post("/books", (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// UPDATE a book
app.put("/books/:id", (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: "Book not found" });
  book.title = req.body.title || book.title;
  book.author = req.body.author || book.author;
  res.json(book);
});

// DELETE a book
app.delete("/books/:id", (req, res) => {
  books = books.filter(b => b.id !== parseInt(req.params.id));
  res.json({ message: "Book deleted successfully" });
});

app.listen(3000, () => {
  console.log("Book API running on http://localhost:3000");
});
