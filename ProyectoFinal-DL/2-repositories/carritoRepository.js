const model = require('../models/carrito');

let createCarrito = async () =>{
    const carritoSaveModel = new model.carritos({timestamp: Date.now()});
    let carritoSave = await carritoSaveModel.save();
    return carritoSave;
};

let getCarrito = (id) =>{
    let carrito =  model.carritos.find({_id: id})
    return carrito;
};
let updateCarrito = (carrito) =>{
        let carritoUpdate =  model.usuarios.updateOne( 
            {_id: carrito.id}, {
            $set:{
                timestamp: Date.now
            }
        })
};
let deleteCarrito = (id) =>{
    let carritoDelete =  model.usuarios.deleteOne({_id: id})    
};

module.exports = {
    createCarrito,
    getCarrito,
    updateCarrito,
    deleteCarrito
    
}