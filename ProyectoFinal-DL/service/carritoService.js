const Carrito = require("../entities/carrito");
let carrito = new Carrito();
let idGen = 1;
let createCarrito = () => {
    var carrito = new Carrito(idGen,Date.now);
    idGen++;
    return carrito;
}

module.exports = {createCarrito}