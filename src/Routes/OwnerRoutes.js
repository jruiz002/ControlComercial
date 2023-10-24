'use strict'

const express = require('express');
const api = express.Router();
const {isLoged, isOwner, isWorker} = require("../../Services/middleware")
const ownerController = require("../Controllers/OwnerController")

api.post("/register", ownerController.register)
api.post("/addWorker/:idSede", [isLoged, isOwner], ownerController.addWorker)
api.post("/login", ownerController.login)

module.exports = api;