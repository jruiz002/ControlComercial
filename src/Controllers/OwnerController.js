"use strict"

const Owner = require("../models/OwnerModel")
const User = require("../models/UserModel")
const Worker = require("../models/WorkerModel")
const {createToken} = require("../../Services/jwt")
const {dataObligatory, encryptPassword, dencryptPassword} = require("../utils/validate");

// Función para poder logearse en la aplicacion
exports.login = async (req, res) => {
    try {
        const body = req.body;
        const data = {
            username: body.username.toUpperCase(),
            password: body.password
        }
        const msg = await dataObligatory(data); 
        if (msg) return res.status(400).send(msg);
        const userFound = await User.findOne({username: data.username})
        if (userFound && await dencryptPassword(data.password, userFound.password)){
            const token = await createToken(userFound)
            return res.status(200).send({token, userFound, message: 'Entrando al sistema...'});
        } else {
            return res.status(404).send({message: 'Credenciales incorrectas'});
        }
    } catch (error) {
        console.log(error)
        return error; 
    }
}

// Función para registrarse en la app como un dueño
exports.register = async (req, res) => {
    try {
        // Variables del método
        const body = req.body;
        const data = {
            username: body.username.toUpperCase(),
            password: body.password,
            phone: body.phone,
            role: "Dueño",
            suppliers: [],
        }
    
        // Parámetros requeridos
        const msg = await dataObligatory(data);
    
        // Validaciones para guardar el owner
        if (msg) return res.status(400).send(msg);
       
        // Se busca si ya existe un dueñi con ese username
        let ownerFound = await User.findOne({username: data.username});
        if (ownerFound) return res.status(400).send({message: 'Este nombre de dueño ya existe.'});
        
        // Se crea la instancia de tipo Owner
        const owner = new Owner(data) 
        owner.password = await encryptPassword(data.password)
        await owner.save();
        return res.status(200).send({message: 'Dueño creado exitosamente.'});
        
    } catch (error) {
        console.log(error)
        return error;
    }
}

// Función para crear un trabajador siendo un Dueño REVISAR
exports.addWorker = async (req, res) => {
    try {
        // Variables del método
        const body = req.body;
        const params = req.params;
        const data = {
            username: body.username.toUpperCase(),
            password: body.password,
            phone: body.phone,
            role: "Trabajador",
            salary: body.salary,
            idSede: params.idSede
        }
    
        // Parámetros requeridos
        const msg = await dataObligatory(data);
       
        // Validaciones para guardar el owner
        if (msg) return res.status(400).send(msg);

        // Se busca si ya existe un trabajador con ese username
        let workerFound = await User.findOne({username: data.username});
        if (workerFound) return res.status(400).send({message: 'Este nombre de trabajador ya existe.'});

        // Se crea la instancia de tipo Owner
        const worker = new Worker(data) 
        worker.password = await encryptPassword(data.password)
        await worker.save();
        return res.status(200).send({message: 'Trabajador creado exitosamente.'});
    
    } catch (error) {
        console.log(error)
        return error;
    }
}

//Funcion para editar perfil dueño

exports.editProfile = async(req, res)=>{
    try {
        const idOwner = req.params.idOwner;
        const body = req.body;
        const data = {
            username: body.username.toUpperCase(), 
            phone: body.phone,
        }

        // Buscar el perfil
        let findOwner = await Owner.findOne({_id: idOwner});

        if (!findOwner) return res.status(404).send({ message: 'No se encontro el perfil' });
        
        // Verificar los datos
        if (data.username == findOwner.username) {
            const updateOwner = await Owner.findOneAndUpdate({ _id: idOwner }, data, {new: true});
            return res.status(200).send({message: 'Perfil Actualizado: ', updateOwner});
        }else{
            const owner = await Owner.findOne({username: data.username.toUpperCase()})
            if (owner) return res.status(400).send({message: 'Ese nombre ya se encuentra en uso.'});
            const updateOwner = await Owner.findOneAndUpdate({_id: idOwner}, data, {new: true});
            return res.status(200).send({message: 'Perfil Actualizado: ', updateOwner});
        }
    } catch (error) {
        console.log(error)
        return error;
    }
}