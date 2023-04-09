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
          return res.json(doc);
        })
        .catch(err => {
          return console.log(err);
        });
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    })

    .post(async (req, res) => {
      let title = req.body.title;
      if (!title) return res.send('missing required field title');

      await Book.create({ title: title })
        .then(doc => {
          return res.json({
            _id: doc._id,
            title: doc.title,
          });
        })
        .catch(err => {
          return console.log(err);
        });
      //response will contain new book object including atleast _id and title
    })

    .delete(async (req, res) => {
      await Book.deleteMany({})
        .then(() => {
          return res.send('complete delete successful');
        })
        .catch(err => {
          return console.log(err);
        });
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(async (req, res) => {
      let bookid = req.params.id;

      await Book.findById(bookid, { __v: 0, commentcount: 0 })
        .then(doc => {
          if (!doc) return res.send('no book exists');
          return res.json(doc);
        })
        .catch(err => {
          return console.log(err);
        });
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })

    .post(async (req, res) => {
      let bookid = req.params.id;
      let comment = req.body.comment;
      if (!comment) return res.send('missing required field comment');

      await Book.findById(bookid) //, { __v: 0}
        .then(async doc => {
          if (!doc) return res.send('no book exists');

          doc.comments.push(comment);
          doc.commentcount = doc.comments.length;
          await doc.save();

          return res.json(doc);
        })
        .catch(err => {
          return console.log(err);
        });
      //json res format same as .get
    })

    .delete(async (req, res) => {
      let bookid = req.params.id;

      await Book.deleteOne({ _id: bookid })
        .then(doc => {
          if (doc.deletedCount === 0) return res.send('no book exists');
          return res.send('delete successful');
        })
        .catch(err => {
          return console.log(err);
        });
      //if successful response will be 'delete successful'
    });

};
