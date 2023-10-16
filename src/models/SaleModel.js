"use strict"

const mongoose = require("mongoose");

const saleSchema = mongoose.Schema({
    saleDate: Date,
    idProduct: {type: mongoose.Schema.ObjectId, ref:'Product'},
    amount: Number,
    total: Number
})

module.exports = mongoose.model("Sale", saleSchema);