const { toNamespacedPath } = require("path");
const { Author } = require("../models/bookModel");
const APIFeatures = require("../utils/apiFeatures");

// GET request to /authors to fetch all author - /api/v1/authors
exports.getAuthors = async(req,res,next)=>{
    const resPerPage = 5;

  let buildQuery = () => {
    return new APIFeatures(Author.find(), req.query).search().filter()
  }

  const filteredAuthorsCount = await buildQuery().query.countDocuments({});
  const totalAuthorsCount = await Author.countDocuments({});  //Here we found total Books Count
  let authorsCount = totalAuthorsCount;
  
  if(filteredAuthorsCount !== totalAuthorsCount){
    authorsCount = filteredAuthorsCount;
  }

  const authors = await buildQuery().paginate(resPerPage).query;

  res.status(200).json({
    success: true,
    count: booksCount,
    resPerPage,
    authors,
  });
};
// Create a New author in POST request - /api/v1/authors/new
exports.newAuthor = async(req,res,next)=>{
    const author = await Author.create(req.body);
    res.status(200).json({
      success:true,
      author
    })
  }
// GET request to /author/:id to fetch single author - /api/v1/author/:id
exports.getOneAuthor = async(req,res,next)=>{
  
    let name = await Author.findById(req.params.id);
    if (!name) {
      return next(new ErrorHandler("Author not found", 400));
    }
    res.status(201).json({
      success: true,
      name,
    });
  };
// PUT request to /author/:id to Update a single author - /api/v1/author/:id

exports.updateAuthor = async (req, res, next) => {
    let name = await Author.findById(req.params.id);
  
    if (!toNamespacedPath) {
      res.status(404).json({
        success: false,
        message: "Author Not Found",
      });
    }
    name = await Author.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      name,
    });
  };


// DELETE request to /author/:id to delete a single author - /api/v1/author/:id
exports.deleteAuthor = async (req, res, next) => {
    let name = await Author.findById(req.params.id);
  
    if (!name) {
      res.status(404).json({
        success: false,
        message: "Author Not Found",
      });
    }
  
    await name.deleteOne();
  
    res.status(200).json({
      success: true,
      message: "Author Deleted Successfully..!",
    });

  };