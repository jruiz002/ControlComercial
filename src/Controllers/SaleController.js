"use strict"

const Product = require("../models/ProductModel")
const Sale = require("../models/SaleModel")
const Campus = require("../models/CampusModel")
const {dataObligatory} = require("../utils/validate")

exports.agregarVentas = async (req, res) => {
    try {
        const body = req.body;
        const idCampus = req.params.idCampus

        // Se busca el producto a vender
        const productFound = await Product.findOne({_id: body.idProduct})

        const dataSale = {
            saleDate: new Date(),
            amount: body.amount,
            idProduct: body.idProduct,
            idCampus: idCampus
        }

        const msg = await dataObligatory(dataSale);

        if (msg) return res.status(400).send(msg);
        if (productFound.amount <= 0) return res.status(404).send({message: 'Lo sentimos, actualmente ya no hay stock de este producto.'});
        if (dataSale.amount > productFound.amount) return res.status(404).send({message: 'Lo sentimos, actualmente no contamos con la suficiente cantidad de producto que desea.'});

        // Se actualiza el producto 
        let newAmount = productFound.amount - dataSale.amount
        const dataProduct = {
            name: productFound.name,
            price: productFound.price,
            amount: newAmount,
            nombreProveedor: productFound.nombreProveedor,
            idCampus: productFound.idCampus
        }
        const productUpdated = await Product.findOneAndUpdate({_id: body.idProduct}, dataProduct, {new:true})

        // Se realiza la venta
        dataSale["total"] = (dataSale.amount * productFound.price)
        let sale = new Sale(dataSale)
        await sale.save()

        // Se actualiza las ventas diarias de la sede en la que se esta trabajando
        const campusFound = await Campus.findOne({_id: idCampus})
        let totalDailySales = campusFound.totalDailySales + dataSale.total
        const dataCampus = {
            name: campusFound.name,
            idOwner: campusFound.idOwner,
            totalDailySales: totalDailySales
        }
        const campusUpdated = await Campus.findOneAndUpdate({_id: idCampus}, dataCampus, {new:true})

        return res.status(200).send({message: 'Venta realizada exitosamente.'});

    } catch (error) {
        console.log(error)
        return error;
    }
}

exports.verVentas = async (req, res) => {
    try {
        const idCampus = req.params.idCampus
        const sales = await Sale.find({idCampus: idCampus}).populate("idProduct").populate("idCampus")
        if (!sales) return res.status(400).send({message: 'No se han realizado ventas en esta sede.'});
        return res.status(200).send({sales});
    } catch (error) {
        console.log(error)
        return error;
    }
}