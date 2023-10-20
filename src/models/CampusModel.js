"use strict"

const mongoose = require("mongoose");

const campusSchema = mongoose.Schema({
    name: String,
    idOwner: {type: mongoose.Schema.ObjectId, ref: 'Owner'},
    totalDailySales: Number
})

module.exports = mongoose.model("Campus", campusSchema)