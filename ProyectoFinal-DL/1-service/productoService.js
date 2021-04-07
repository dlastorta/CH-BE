const Producto = require("../entities/producto");
const productoRepository = require('../2-repositories/productoRepository');

let createProducto = (newProducto)=>{
    newProducto.id = productoRepository.createProducto(newProducto);
    console.log(`New Producto with Id: ${newProducto.id}`);
    return newProducto;
}

let getAllProductos = () => {
    return ProductoRepository.getProductos({},{});
};

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
    getAllProductos,
    getProductobyId,
    updateProducto
};
