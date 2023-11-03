"use strict"

const Sale = require("../models/SaleModel")
const Product = require("../models/ProductModel")
const Campus = require("../models/CampusModel")
const {dataObligatory} = require("../utils/validate")

// Función para crear una sede perteneciente a un dueño
exports.agregarSede = async (req, res) => {
    try {
        // Variables del método
        const body = req.body;
        const params = req.params;
        const data = {
            name: body.name.toUpperCase(),
            totalDailySales: 0,
            idOwner: params.id
        }

        // Parámetros requeridos
        const msg = await dataObligatory(data);

        // Validaciones para guardar el owner
        if (msg) return res.status(400).send(msg);

        //Se busca en la coleccion si ya existe una sede con ese nombre
        let campusFound = await Campus.findOne({name: data.name, idOwner: data.idOwner});
        if (campusFound) return res.status(400).send({message: 'El nombre de esta sede ya existe.'});

        // Se crea la instancia de tipo Campus
        const campus = new Campus(data)
        await campus.save()
        return res.status(200).send({message: 'Sede creada exitosamente.'});

    } catch (error) {
        console.log(error)
        return error;
    }
}

// Función que servirá para mostrar todas las sedes de un trabajador
exports.verSedes = async (req, res) => {
    try {
        const params = req.params;
        const sedes = await Campus.find({idOwner: params.idOwner});
        return res.status(200).send({sedes});
    } catch (error) {
        console.log(error)
        return error;
    }
}

// Función que servirá para mostrar una sede en específico
exports.verSede = async (req, res) => {
    try {
        const params = req.params;
        const sede = await Campus.findOne({name: params.nameSede});
        return res.status(200).send({sede});
    } catch (error) {
        console.log(error)
        return error;
    }
}

// Función para editar una sede
exports.editarSede = async (req, res) => {
    try {
        // Variables del método
        const idSede = req.params.idSede;
        const idOwner = req.params.idOwner;
        const body = req.body;
        const data = {
            name: body.name.toUpperCase()
        }

        let sedeFound = await Campus.findOne({_id: idSede, idOwner: idOwner})

        if (sedeFound.name != data.name){
            const sede= await Campus.findOne({name: data.name, idOwner: idOwner})
            if (sede) return res.status(400).send({message: 'Este nombre de sede ya existe.'});
            const sedeUpdated = await Campus.findOneAndUpdate({_id: idSede}, data, {new: true})
            return res.status(200).send({message: 'Sede Actualizado'});
        } else{
            return res.status(200).send({message: 'Sede Actualizado'});
        }

    } catch (error) {
        console.log(error)
        return error;
    }
}

// Función para eliminar una sede
exports.eliminarSede = async (req, res) => {
    try {
        const idSede = req.params.idSede;
        /*
            Para eliminar una sede se necesita lo siguiente:
            1. Eliminar todas las ventas asociadas a la sede
            2. Eliminar todos los productos a la sede
            3. Eliminar la sede 
        */ 

        // Eliminar todas las ventas asociadas a la sede
        const salesDeleted =  await Sale.deleteMany({idCampus: idSede});
        // Eliminar los productos de la sede
        const productDeleted = await Product.deleteMany({idCampus: idSede})
        // Eliminar la sede
        const campusDeleted = await Campus.findOneAndDelete({_id: idSede})

        return res.status(200).send({message: "Sede eliminada"})

    } catch (error) {
        console.log(error)
        return error;
    }
} 