'use strict'

const jwt = require('jwt-simple');
const secretKey = 'secretKey';

//Middleware para verficar que esté logeado

exports.isLoged = (req, res, next)=>{
    if(req.headers.authorization){
        try{
            let token = req.headers.authorization.replace(/['",]+/g, '');
            let payload = jwt.decode(token, secretKey);
            req.user = payload;
            next();
        }catch(err){
            console.log(err);
            return err;
        }
    }else{
        return res.status(401).send({message: 'La solicitud no contiene el encabezado de autenticación.'});
    }      
}

//Middleware para verificar que sea admin
exports.isOwner = (req, res, next)=>{
    try{
        const user = req.user;
        if(user.role === 'Dueño'){
            next();
        }else{
            return res.status(403).send({message: 'Usuario no autorizado'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

//Middleware para verificar que sea admin
exports.isWorker = (req, res, next)=>{
    try{
        const user = req.user;
        if(user.role === 'Trabajador'){
            next();
        }else{
            return res.status(403).send({message: 'Usuario no autorizado'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}