"use strict"

const mongoose = require("mongoose");

const saleSchema = mongoose.Schema({
    saleDate: Date,
    amount: Number,
    total: Number,
    idProduct: {type: mongoose.Schema.ObjectId, ref:'Product'},
    idCampus: {type: mongoose.Schema.ObjectId, ref:'Campus'}
})

module.exports = mongoose.model("Sale", saleSchema);