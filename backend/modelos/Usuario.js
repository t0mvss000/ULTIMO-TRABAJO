const mongoose = require ("mongoose")
const { type } = require("os")
const { stringify } = require("querystring")
const {Schema}=mongoose

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
}) 
module.exports = mongoose.model("users",UserSchema,"usuarios")