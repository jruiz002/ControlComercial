'use strict'

const express = require('express');
const api = express.Router();
const {isLoged, isOwner, isWorker} = require("../../Services/middleware")
const workerController= require("../Controllers/WorkerController")

api.put("/updateWorker/:idWorker", [isLoged, isOwner], workerController.updateWorker)
api.delete("/deleteWorker/:idWorker", [isLoged, isOwner], workerController.deleteWorker)
api.put("/workers", [isLoged, isOwner], workerController.workers)
api.get("/verPerfil/:idWorker", [isLoged], workerController.verPerfil)

module.exports = api