const Carrito = require("../entities/carrito");
let idGen = 1;
let carritos = []


let createCarrito = () => {
    var carrito = new Carrito(idGen,Date.now);
    idGen++;
    return carrito;
}

module.exports = {createCarrito}