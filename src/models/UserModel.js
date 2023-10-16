"use strict"

const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    phone: String,
    role: String
});

module.exports = mongoose.model("Usuario", userSchema);
