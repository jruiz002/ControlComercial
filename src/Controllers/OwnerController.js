"use strict"

const Owner = require("../models/OwnerModel")

exports.testAdminController = (req, res)=>{
    return res.send({message: 'The function test owner controller is running.'})
}

exports.saveOwner = async (req, res) => {
    const nuevoOwner = {
        username: "John",
        password: "123",
        phone: "12345678",
        role: "Dueño",
        suppliers: ["Proveedor1", "Proveedor2"],
    }

    const owner = new Owner(nuevoOwner)
    await owner.save();
    return res.status(200).send({message: 'Owner created successfully.'});

}