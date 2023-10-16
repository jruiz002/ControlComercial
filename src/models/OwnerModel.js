"use strict"

const mongoose = require("mongoose");
const User = require("./UserModel");

const ownerSchema = mongoose.Schema({
    suppliers: []
});

module.exports = User.discriminator("Owner", ownerSchema);