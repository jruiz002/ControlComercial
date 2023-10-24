"use strict"

const express = require("express")
const api = express.Router();
const controllerSale = require("../Controllers/SaleController")

api.post("/agregarVentas/:idCampus", controllerSale.agregarVentas)
api.get("/verVentas/:idCampus", controllerSale.verVentas)

module.exports = api;