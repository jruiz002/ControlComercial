"use strict"

const mongoose = require("mongoose");

const campusSchema = mongoose.Schema({
    name: String,
    idWorker: {type: mongoose.Schema.ObjectId, ref: 'Worker'},
    idOwner: {type: mongoose.Schema.ObjectId, ref: 'Owner'},
    idInventory: {type: mongoose.Schema.ObjectId, ref: 'Inventory'},
    sales: []
})