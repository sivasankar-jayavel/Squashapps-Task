const mongoose =require("mongoose");

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
  });
  
  const authorSchema = new mongoose.Schema({
    name: String,
    books: String,
  });

  const Book = mongoose.model('Book', bookSchema);
  const Author = mongoose.model('Author', authorSchema);

module.exports = {Book,Author};