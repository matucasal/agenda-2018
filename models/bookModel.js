const mongoose= require("mongoose");
const Schema = mongoose.Schema;
const bookModel = new Schema({
    title: { type: String   },
    author: { type: String }
})


 module.exports = mongoose.model('books', bookModel);
