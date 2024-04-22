const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Definiendo modelo 1
const repuestoSchema = new Schema ({

    //_id: String,

    Pieza:{
        type: String,
        require: true,
        unique: true,
        min: 4,
        max: 64
    },

    Descripción: {
        type: String,
        require: true,
        min: 4,
        max: 1024
    },

    Clase: {
        type: String,
        min: 4,
        max: 64
    },

    UDM: {
        type: String

    },

    Reparable: {
        type: String,

    },

    Criticidad: {
        type: String,
        //require: true,
        min: 8,
        max: 64
    },

    Imagen: {
        type: String,
        //require: true,
        min: 8,
        max: 255
    },

    Imagen1: {
        type: String,
        //require: true,
        min: 8,
        max: 255
    },

});

const inf_repuestos = mongoose.model('inf_repuestos', repuestoSchema);
module.exports = inf_repuestos;