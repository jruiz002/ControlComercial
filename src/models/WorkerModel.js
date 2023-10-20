"use strict"

const mongoose = require("mongoose");
const User = require("./UserModel");

const workerSchema = mongoose.Schema({
    salary: Number,
    idSede: {type: mongoose.Schema.ObjectId, ref: "Worker"}
});

module.exports = User.discriminator("Worker", workerSchema);