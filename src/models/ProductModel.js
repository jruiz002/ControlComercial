"use strict"

const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: String,
    price: Number,
    amount: Number,
    nombreProveedor: String,
    idCampus: {type: mongoose.Schema.ObjectId, ref:'Campus'}
})

module.exports = mongoose.model("Product", productSchema)