const mongoose= require("mongoose");
const Schema = mongoose.Schema;
const eventModel = new Schema({
    nombre: { type: String   },
    direccion: { type: String },
    fecha: {type: Date, default: Date.now },
    precio: {type: Number},
    descripcion: {type: String},
    users : [{ type: Schema.Types.ObjectId, ref: 'usuario' }]
})


 module.exports = mongoose.model('evento', eventModel);
