const mongoose= require("mongoose");
const Schema = mongoose.Schema;
const eventModel = new Schema({
    nombre: { type: String   },
    direccion: { type: String },
    fecha: { type: String }
})


 module.exports = mongoose.model('evento', eventModel);
