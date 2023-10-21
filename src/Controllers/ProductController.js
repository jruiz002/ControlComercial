"use strict"

const Product = require("../models/ProductModel")
const {dataObligatory} = require("../utils/validate");

//Agregar un producto a un campus
exports.agregarProducto = async (req, res) => {
    try {
        const body = req.body;
        const idCampus = req.params.idCampus;
        const data = {
            name: body.name.toUpperCase(), //DUDA
            price: body.price,
            amount: body.amount,
            nombreProveedor: body.nombreProveedor,
            idCampus: idCampus
        }

        const msg = await dataObligatory(data);

        if (msg) return res.status(400).send(msg);
        let productFound = await Product.findOne({name: body.name.toUpperCase(), idCampus: idCampus});
        if (productFound) return res.status(400).send({message: 'Este producto ya existe.'});
        let producto = new Product(data);
        await producto.save();
        return res.status(200).send({message: 'Producto agregado exitosamente.'});

    } catch (error) {
        console.log(error)
        return error;
    }
}

//Editar un producto por su ID
exports.editarProducto = async (req, res) => {
    try {
        const idProducto = req.params.idProducto;
        const idCampus = req.params.idCampus;
        const body = req.body;
        const data = {
            name: body.name.toUpperCase(),
            price: body.price,
            amount: body.amount,
            nombreProveedor: body.nombreProveedor
        }
        // 
        let productFound = await Product.findOne({_id: idProducto});
    
        //Acutualizar si es el mismo nonmbre de producto
        if (data.name == productFound.name){
            const productUpdated = await Product.findOneAndUpdate({_id: idProducto}, data, {new: true});
            return res.status(200).send({message: 'Producto Actualizado: ', productUpdated});
        }else{
            const product = await Product.findOne({name: data.name.toUpperCase(), idCampus: idCampus})
            if (product) return res.status(400).send({message: 'Este producto ya existe.'});
            const productUpdated = await Product.findOneAndUpdate({_id: idProducto}, data, {new: true});
            return res.status(200).send({message: 'Producto Actualizado: ', productUpdated});
        }
    } catch (error) {
        console.log(error)
        return error;
    }

}

//Eliminar producto por ID
exports.eliminarProducto = async (req, res) => {
    try {
        const idProducto = req.params.idProducto;
        const productDelet = await Product.findOneAndDelete({_id: idProducto});
        return res.status(200).send({message: "Produto Eliminado exitosamente", productDelet});
        
    } catch (error) {
        console.log(error)
        return error;
    }
}

//Ver todos los productos de una sede
exports.verProductos = async(req,res) =>{
    try {
        const idCampus = req.params.idCampus;
        const productos = await Product.find({idCampus: idCampus});
        return res.status(200).send({productos});
    } catch (error) {
        console.log(error)
        return error;
    }
}

//Ver un producto en especifico de una sede
exports.verProducto = async(req, res) =>{
    try{
        const idProducto = req.params.idProducto;
        const producto  = await Product.findOne({_id: idProducto});
        return res.status(200).send({producto});

    }catch (error) {
        console.log(error)
        return error;
    }
}
