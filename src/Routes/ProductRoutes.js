"use strict"

const express = require('express');
const api = express.Router();
const {isLoged, isOwner, isWorker} = require("../../Services/middleware")
const productController = require("../Controllers/ProductController");

api.post("/agregarProducto/:idCampus",[isLoged], productController.agregarProducto);
api.put("/editarProducto/:idProducto/:idCampus",[isLoged], productController.editarProducto);
api.delete("/eliminarProducto/:idProducto", [isLoged],productController.eliminarProducto);
api.get("/verProductos/:idCampus", [isLoged],productController.verProductos);
api.get("/verProducto/:idProducto", [isLoged],productController.verProducto);


module.exports = api;