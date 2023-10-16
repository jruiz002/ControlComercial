'use strict'

const express = require('express');
const api = express.Router();
const ownerController = require("../Controllers/OwnerController")

api.get("/testOwner", ownerController.saveOwner)

module.exports = api;