"use strict"

const express = require('express');
const api = express.Router();
const productController = require("../Controllers/ProductController");

api.post("/agregarProducto", productController.agregarProducto);
api.put("/editarProducto/:id", productController.editarProducto);

module.exports = api;