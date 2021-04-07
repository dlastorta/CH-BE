const Carrito = require("../entities/carrito");
const carritoRepository = require('../2-repositories/carritoRepository');

let createCarrito = async () => {
    console.log('c serv');
    let carrito = carritoRepository.createCarrito();
    return carrito;
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