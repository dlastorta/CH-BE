const Producto = require("../entities/producto");

let productos = []
let idGen = 1;
let getProductos = () => {
    return productos;
};

let createProducto = (nombre,descripcion,codigo,thumbnail,precio,stock)=>{
    let newProducto = new Producto(idGen,Date.now, nombre,descripcion,codigo,thumbnail,precio,stock);
    idGen++;
    productos.push(newProducto);
    return newProducto;
}

module.exports = {
    createProducto,
    getProductos
};