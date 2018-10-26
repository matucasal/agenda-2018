const express = require("express");
const Book = require('../models/bookModel');
const bookRouter = express.Router();



bookRouter.route('/')
    .get((req, res) => {
        Book.find({}, (err, books) => {
            res.json(books)
        })
    })
    .post((req,res) => {
        let book = new Book(req.body); // edited line
        console.log("Estoy en el post");
        console.log(req.body);
        book.save()
        res.status(201).send(book)
    })// end post
    
    
    
bookRouter.route('/:bookId')
    .get((req, res) => {
        Book.findById(req.params.bookId, (err, book) => {
            res.json(book)
        })
    }) // end get
    .put((req,res) => {
        Book.findById(req.params.bookId, (err, book) => {
            book.title = req.body.title;
            book.author = req.body.author;
            book.save()
            res.json(book)
        }) 
    }) // end put
    .patch((req,res)=>{
        Book.findById(req.params.bookId, (err, book) => {
            if(req.body._id){
                delete req.body._id;
            }
            for( let b in req.body ){
                book[b] = req.body[b];
            }
            book.save();
            res.json(book);
        })
    })// end patch
     .delete((req,res)=>{
        Book.findById(req.params.bookId, (err, book) => {
            book.remove(err => {
                if(err){
                    res.status(500).send(err)
                }
                else{
                    res.status(204).send('removed')
                }
            })
        })
    })//end delete


module.exports = bookRouter;
