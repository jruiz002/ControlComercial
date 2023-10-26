"use strict"

const express = require("express")
const api = express.Router();
const {isLoged, isOwner, isWorker} = require("../../Services/middleware")
const controllerSale = require("../Controllers/SaleController")

api.post("/agregarVentas/:idCampus", [isLoged],controllerSale.agregarVentas)
api.get("/verVentas/:idCampus",[isLoged],controllerSale.verVentas)

module.exports = api;