"use strict"

const express = require('express');
const api = express.Router();
const controllerCampus = require("../Controllers/CampusController")

api.post("/agregarSede/:id", controllerCampus.agregarSede)
api.get("/verSedes/:idOwner", controllerCampus.verSedes)
api.get("/verSede/:nameSede", controllerCampus.verSede)
api.put("/editarSede/:idSede", controllerCampus.editarSede)

module.exports = api;