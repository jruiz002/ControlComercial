"use strict"

const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors");
const ownerRoutes = require("../src/Routes/OwnerRoutes")
const productRoutes = require("../src/Routes/ProductRoutes")
const campusRoutes = require("../src/Routes/CampusRoutes")
const saleRoutes = require("../src/Routes/SaleRoutes")
const workerRoutes = require("../src/Routes/WorkerRoutes")

const app = express();

//CONFIGURACIONES INTERNAS DEL SERVIDOR
app.use(helmet());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

// RUTAS DEL SERVIDOR
app.use("/owner", ownerRoutes)
app.use("/product", productRoutes)
app.use("/campus", campusRoutes)
app.use("/sale", saleRoutes)
app.use("/worker", workerRoutes)

module.exports = app;