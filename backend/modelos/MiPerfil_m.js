const mongoose = require ("mongoose")
const { type } = require("os")
const { stringify } = require("querystring")
const {Schema}=mongoose

const MiPerfil = new Schema({
    name:{
        type: String,
        required: true  
    },
    gmail:{
        type: String,
        required: true
    },
    image:{
        type: String, //SE GUARDA LA RUTA DONDE ESTA LAS IMAGENES MONGO DB NO GUARDA LAS IMAGENES
        required: false 
    }

})
module.exports = mongoose.model ("MiPerfil",MiPerfil,"Perfil")   