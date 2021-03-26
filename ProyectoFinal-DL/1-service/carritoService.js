const Carrito = require("../entities/carrito");
const carritoRepository = require('../2-repositories/carritoRepository');

let idGen = 1;


let createCarrito = () => {
    let carrito = carritoRepository.createCarrito();
    return carrito;
}

let updateCarrito = (data) => {
    carritoRepository.writeFile(data)
}


module.exports = {
    createCarrito,
    updateCarrito
}