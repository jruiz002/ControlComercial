'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secretKey = 'secretKey';

//Función para crear un token dependiendo del rol del usuario
exports.createToken = async (user) => {
    try {
        if (user.role == "Dueño"){
            const payload = {
                id: user._id,
                username: user.username,
                role: user.role,
                iat: moment().unix(),
                exp: moment().add(5, 'hour').unix()
            }
            return jwt.encode(payload, secretKey);

        }else if (user.role == "Trabajador"){
            const payload = {
                id: user._id,
                username: user.username,
                role: user.role,
                idSede: user.idSede,
                iat: moment().unix(),
                exp: moment().add(5, 'hour').unix()
            }
            return jwt.encode(payload, secretKey);

        }
    } catch (error) {
        console.log(error)
        return error;
    }
}