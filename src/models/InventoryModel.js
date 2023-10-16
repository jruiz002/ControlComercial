"use strict"

const mongoose = require("mongoose");

const inventorySchema = mongoose.Schema({
    productsList: []
});

module.exports = mongoose.model("Inventory", inventorySchema)