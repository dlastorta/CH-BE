const Carrito = require("../entities/carrito");
const carritoRepository = require('../repositories/carritoRepository');

let idGen = 1;


let createCarrito = () => {
    let carrito = new Carrito(idGen,Date.now());
    idGen++;
    return carrito;
}

let updateCarrito = (data) => {
    carritoRepository.writeFile(data)
}


module.exports = {
    createCarrito,
    updateCarrito
}