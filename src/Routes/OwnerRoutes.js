'use strict'

const express = require('express');
const api = express.Router();
const ownerController = require("../Controllers/OwnerController")

api.post("/register", ownerController.register)
api.post("/addWorker/:idSede", ownerController.addWorker)
api.post("/login", ownerController.login)

module.exports = api;