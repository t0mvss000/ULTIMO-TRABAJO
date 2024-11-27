const mongoose = require ("mongoose")
const { type } = require("os")
const { stringify } = require("querystring")
const {Schema}=mongoose

const AñadirPractica = new Schema({
    name_practice:{
        type: String,
        required: true
    },
    student_name:{
        type: String,
        required: true
    },
    company:{
        type: String,
        required: true
    },

    date_start:{
        type: Date,
        required: true
    },
    description:{
        type: String,
        required: true 

    }

})
module.exports = mongoose.model ("AñadirPractica",AñadirPractica,"Añadir Practica")