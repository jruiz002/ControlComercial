"use strict"

const express = require('express');
const api = express.Router();
const productController = require("../Controllers/ProductController");

api.post("/agregarProducto/:idCampus", productController.agregarProducto);
api.put("/editarProducto/:idProducto/:idCampus", productController.editarProducto);
api.delete("/eliminarProducto/:idProducto", productController.eliminarProducto);
api.get("/verProductos/:idCampus", productController.verProductos);
api.get("/verProducto/:idProducto", productController.verProducto);


module.exports = api;