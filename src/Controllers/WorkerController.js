'use strict'

const Worker = require("../models/WorkerModel")

// Función para actualizar trabajador 
exports.updateWorker = async (req, res) => {
    try {
        const idWorker = req.params.idWorker;
        const body = req.body;
        const data = {
            username: body.username.toUpperCase(), 
            phone: body.phone,
            salario: body.salario,
            idSede: body.idSede, 
        }

        // Buscar al trabajador por su id
        let findWorker = await Worker.findOne({_id: idWorker});

        if (!findWorker) return res.status(404).send({ message: 'Trabajador no encontrado' });
        
        // Verificar si el nuevo nombre de usuario ya existe y actualizar si es el mismo
        if (data.username == findWorker.username) {
            const updateWork = await Worker.findOneAndUpdate({ _id: idWorker }, data, {new: true});
            return res.status(200).send({message: 'Trabajador Actualizado: ', updateWork});
        }else{
            const worker = await Worker.findOne({username: data.username.toUpperCase()})
            if (worker) return res.status(400).send({message: 'Este trabajador ya existe.'});
            const updateWork = await Worker.findOneAndUpdate({_id: idWorker}, data, {new: true});
            return res.status(200).send({message: 'Trabajador Actualizado: ', updateWork});
        }
    } catch (error) {
        console.log(error)
        return error;
    }
}

//Funcion eliminar trabajador
exports.deleteWorker = async (req, res) =>{
    try {
        const idWorker = req.params.idWorker;
        const deleteWork = await Worker.findOneAndDelete({_id: idWorker});
        return res.status(200).send({message: "Trabajador Eliminado exitosamente", deleteWork});

    } catch (error) {
        console.log(error)
        return error;
    }
}

//Funcion ver Trabajadores
exports.workers = async(req, res) =>{
    try {
        const work = await Worker.find();
        return res.status(200).send({message:"Lista de trabajadores: ",work});
    } catch (error) {
        console.log(error)
        return error;
    }
}

//Función parav ver el perfil de la persona logeada (Worker)
exports.verPerfil = async(req, res)=>{
    try {
        const idWorker = req.params.idWorker;
        const worker = await Worker.findOne({_id: idWorker});
        return res.status(200).send({worker});

    } catch (error) {
        console.log(error)
        return error;
    }
}