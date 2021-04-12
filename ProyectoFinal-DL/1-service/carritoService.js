const Carrito = require("../entities/carrito");
const carritoRepository = require('../2-repositories/carritoRepository');

let createCarrito = async () => {
    return await carritoRepository.createCarrito();    
}

let updateCarrito = (data) => {
    carritoRepository.updateCarrito(data)
}

let getCarrito = (data) => {
    carritoRepository.getCarrito(data)
}

let deleteCarrito = (data) => {
    carritoRepository.deleteCarrito(data)
}


module.exports = {
    createCarrito,
    getCarrito,
    updateCarrito,
    deleteCarrito
}