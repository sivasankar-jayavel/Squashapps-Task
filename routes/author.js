const express =require('express');
const { 
     getAuthors,
     newAuthor, 
     getOneAuthor,
     updateAuthor,
     deleteAuthor
     } = require('../controllers/authorController');

const router = express.Router();

router.route('/authors').get(getAuthors);
router.route('/authors/new').post(newAuthor);
router.route('/author/:id').get(getOneAuthor)
                           .put(updateAuthor)
                           .delete(deleteAuthor);


module.exports = router;