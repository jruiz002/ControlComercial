"use strict"

const mongoose = require("mongoose");
const User = require("./UserModel");

const workerSchema = mongoose.Schema({
    salary: Number
});

module.exports = User.discriminator("Worker", workerSchema);