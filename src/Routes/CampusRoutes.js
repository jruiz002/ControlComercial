"use strict"

const express = require('express');
const api = express.Router();
const {isLoged, isOwner, isWorker} = require("../../Services/middleware")
const controllerCampus = require("../Controllers/CampusController")

api.post("/agregarSede/:id", [isLoged, isOwner], controllerCampus.agregarSede)
api.get("/verSedes/:idOwner", [isLoged, isOwner], controllerCampus.verSedes)
api.get("/verSede/:nameSede", [isLoged], controllerCampus.verSede)
api.put("/editarSede/:idSede/:idOwner", [isLoged, isOwner], controllerCampus.editarSede)
api.delete("/eliminarSede/:idSede", [isLoged, isOwner], controllerCampus.eliminarSede)

module.exports = api;