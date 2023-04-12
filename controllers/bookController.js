const { Book } = require("../models/bookModel");
const ErrorHandler = require('../utils/errorHandler');
const APIFeatures = require("../utils/apiFeatures");

// GET request to /books to fetch all Book - /api/v1/books
exports.getBooks = async (req,res,next)=>{
  const resPerPage = 5;

  let buildQuery = () => {
    return new APIFeatures(Book.find(), req.query).search().filter()
  }

  const filteredBooksCount = await buildQuery().query.countDocuments({});
  const totalBooksCount = await Book.countDocuments({});  //Here we found total Books Count
  let booksCount = totalBooksCount;
  
  if(filteredBooksCount !== totalBooksCount){
    booksCount = filteredBooksCount;
  }

  const books = await buildQuery().paginate(resPerPage).query;

  res.status(200).json({
    success: true,
    count: booksCount,
    resPerPage,
    books,
  });
};

    // res.status(200).json({
    //     success:true,
    //     message:"It will show all the Book in DB"
    // })

// Create a New Book in POST request - /api/v1/books/new
exports.newBook = async(req,res,next)=>{
  const book = await Book.create(req.body);
  res.status(200).json({
    success:true,
    book
  })
}


// GET request to /book/:id to fetch single Book - /api/v1/book/:id
exports.getOneBook = async(req,res,next)=>{
  
    let book = await Book.findById(req.params.id);
    if (!book) {
      return next(new ErrorHandler("book not found", 400));
    }
    res.status(201).json({
      success: true,
      book,
    });
  };
  
// PUT request to /book/:id to Update a single Book - /api/v1/book/:id
exports.updateBook = async (req, res, next) => {
    let book = await Book.findById(req.params.id);
  
    if (!book) {
      res.status(404).json({
        success: false,
        message: "Book Not Found",
      });
    }
    book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      book,
    });
  };
// DELETE request to /book/:id to delete a single Book - /api/v1/book/:id
exports.deleteBook = async (req, res, next) => {
    let book = await Book.findById(req.params.id);
  
    if (!book) {
      res.status(404).json({
        success: false,
        message: "Book Not Found",
      });
    }
  
    await book.deleteOne();
  
    res.status(200).json({
      success: true,
      message: "Book Deleted Successfully..!",
    });
  };

