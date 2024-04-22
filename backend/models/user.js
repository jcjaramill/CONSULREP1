const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Definiendo modelo 1
const usersioSchema = new Schema ({

    //_id: String,

    name:{
        type: String,
        require: true,
        min: 4,
        max: 255
    },

    username: {
        type: String,
        require: true,
        unique: true,
        min: 4,
        max: 255
    },

    password: {
        type: String,
        require: true,
        min: 4,
        max: 1024
    },

    role: {
        type: String,
        require: true,

    },

    sign_up_date: {
        type: Date,
        require: true,

    },

    email: {
        type: String,
        //require: true,
        min: 8,
        max: 64
    },


});

const dbusers = mongoose.model('dbusers', usersioSchema);
module.exports = dbusers;