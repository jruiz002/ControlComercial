"use strict"

const Product = require("../models/ProductModel")
const {dataObligatory} = require("../utils/validate");

exports.agregarProducto = async (req, res) => {
    try {
        const body = req.body;
        const data = {
            name: body.name.toUpperCase(),
            price: body.price,
            amount: body.amount
        }

        const msg = await dataObligatory(data);

        if (msg) return res.status(400).send(msg);
        let productFound = await Product.findOne({name: body.name.toUpperCase()});
        if (productFound) return res.status(400).send({message: 'Este producto ya existe.'});
        let producto = new Product(data);
        await producto.save();
        return res.status(200).send({message: 'Producto agregado exitosamente.'});

    } catch (error) {
        console.log(error)
        return error;
    }
}

exports.editarProducto = async (req, res) => {
    try {
        const idProducto = req.params.id;
        const body = req.body;
        const data = {
            name: body.name.toUpperCase(),
            price: body.price,
            amount: body.amount
        }
        // 
        let productFound = await Product.findOne({_id: idProducto});
    
        if (data.name == productFound.name){
            const productUpdated = await Product.findOneAndUpdate({_id: idProducto}, data, {new: true});
            return res.status(200).send({message: 'Producto Actualizado: ', productUpdated});
        }else{
            const product = await Product.findOne({name: data.name})
            if (product) return res.status(400).send({message: 'Este producto ya existe.'});
            const productUpdated = await Product.findOneAndUpdate({_id: idProducto}, data, {new: true});
            return res.status(200).send({message: 'Producto Actualizado: ', productUpdated});
        }
        
    } catch (error) {
        console.log(error)
        return error;
    }

}

exports.elimarProducto = async (req, res) => {
    try {
        const idProducto = req.params.id;
        
    } catch (error) {
        console.log(error)
        return error;
    }
}
