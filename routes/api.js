/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';
const Book = require('../schemas/Book.js');

module.exports = function (app) {

  app.route('/api/books')
    .get(async (req, res) => {
      await Book.find({}, { comments: 0, __v: 0 })
        .then(doc => {
          res.json(doc);
          console.log("logged all the books!");
        })
        .catch(err => {
          return console.log(err);
        })
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    })

    .post(async (req, res) => {
      let title = req.body.title;
      await Book.create({ title: title })
        .then(doc => {
          res.json({
            _id: doc._id,
            title: doc.title,
          });
          console.log("New Book Added!");
        })
        .catch(err => {
          return console.log(err);
        })
      //response will contain new book object including atleast _id and title
    })

    .delete(function (req, res) {
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(function (req, res) {
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })

    .post(function (req, res) {
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
    })

    .delete(function (req, res) {
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
    });

};
