"use strict"

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
        let campusFound = await Campus.findOne({name: data.name});
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
        const body = req.body;
        const data = {
            name: body.name.toUpperCase()
        }

        let sedeFound = await Campus.findOne({_id: idSede})

        if (sedeFound.name != data.name){
            const sede= await Campus.findOne({name: data.name})
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