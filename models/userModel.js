const mongoose= require("mongoose");
const Schema = mongoose.Schema;
const userModel = new Schema({
    nombre: { type: String   },
    apellido: { type: String },
    edad: { type: Number },
    username: {type: String}
})


 module.exports = mongoose.model('usuario', userModel);
