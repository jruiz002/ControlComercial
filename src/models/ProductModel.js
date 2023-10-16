"use strict"

const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: String,
    price: Number,
    amount: Number,
})

module.exports = mongoose.model("Product", productSchema)