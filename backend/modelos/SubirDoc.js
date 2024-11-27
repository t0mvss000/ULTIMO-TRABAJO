const mongoose = require ("mongoose")
const { type } = require("os")
const { stringify } = require("querystring")
const {Schema}=mongoose

const SubirDoc = new Schema({
    seleccion_archivo:{
        type: String,
        required: true
    },
    boton_subir:{
        type: String,
        required: true
    },
    image:{
        type: String, 
        required: false 
    }

})
module.exports = mongoose.model ("SubirDoc",SubirDoc,"Documentos")
