'use strict'

const express = require('express');
const api = express.Router();
const {isLoged, isOwner, isWorker} = require("../../Services/middleware")
const ownerController = require("../Controllers/OwnerController")

api.post("/register", ownerController.register)
api.post("/addWorker/:idSede", [isLoged, isOwner], ownerController.addWorker)
api.post("/login", ownerController.login)
api.put("/editProfile/:idOwner", [isLoged, isOwner], ownerController.editProfile)
api.get("/verPerfil/:idOwner", [isLoged], ownerController.verPerfil) 
api.post("/agregarProveedor/:idOwner", [isLoged, isOwner], ownerController.agregarProveedor)
api.get("/verProveedores/:idOwner", ownerController.verProveedores)

module.exports = api;