const express = require('express');
const { 
     getBooks,
     newBook, 
     getOneBook, 
     updateBook, 
     deleteBook } = require('../controllers/bookController');

const router = express.Router();

router.route('/books').get(getBooks);
router.route('/books/new').post(newBook);
router.route('/book/:id').get(getOneBook)
                         .put(updateBook)
                         .delete(deleteBook);

module.exports = router;