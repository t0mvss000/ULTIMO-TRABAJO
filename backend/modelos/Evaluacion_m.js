const mongoose = require ("mongoose")
const { type } = require("os")
const { stringify } = require("querystring")
const {Schema}=mongoose

const Evaluacion = new Schema({
    name_evaluador:{
        type: String,
        required: true
    },
    rol:{
        type: String,
        required: true
    },
    name_alumno:{
        type: String,
        required: false 
    },
    name_empresa:{  // New field for company name
        type: String,
        required: true  // Made required since you want to add it
    },
    date_start:{
        type: Date,
        required: true
    },
    calification:{
        type: String,
        required: true 
    },
    comentarios:{
        type: String,
        required: false
    }
})

module.exports = mongoose.model ("Evaluacion",Evaluacion)