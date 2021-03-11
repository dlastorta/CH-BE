const Producto = require("../entities/producto");
const productoRepository = require('../repositories/productoRepository');

let productos = []
let idGen = 1;
let getProductos = () => {
    return productos;
};

let createProducto = (nombre,descripcion,codigo,thumbnail,precio,stock)=>{
    let newProducto = new Producto(idGen,Date.now(), nombre,descripcion,codigo,thumbnail,precio,stock);
    idGen++;
    productos.push(newProducto);
    productoRepository.writeFile(productos);
    return newProducto;
}

let getProductobyId = (id) => {
    return productos.find((producto) => {
        if (producto.id == id) {
            return producto;
        }
    })
};

let updateProducto = (id, data) => {
    let producto = productos.find(producto => producto.id == id)
    if (producto) {
        producto.timestamp = Date.now(),
        producto.nombre = data.nombre,
        producto.descripcion = data.descripcion,
        producto.codigo = data.codigo,
        producto.thumbnail = data.thumbnail,
        producto.precio = data.precio,
        producto.stock = data.stock
        productoRepository.writeFile(productos);
        return producto;
    }
}

let borrarProducto = (id) => {
    let indice = productos.findIndex(producto => producto.id == id);
    if (indice && indice > -1) {
        let producto = productos[indice]
        productos.splice(indice, 1);
        productoRepository.writeFile(productos);
        return producto;
    }
}

module.exports = {
    borrarProducto,
    createProducto,
    getProductos,
    getProductobyId,
    updateProducto
};
