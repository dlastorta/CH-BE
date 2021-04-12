const Producto = require("../entities/producto");
const productoRepository = require('../2-repositories/productoRepository');

let createProducto = async (data)=>{
    return await productoRepository.createProducto(data)              
}

let updateProducto = async (id, data) => {
    return productoRepository.updateProducto(id, data)
    .then(
        (productoUpdate) =>{
        return productoUpdate;
        }
    )
    
}

let getAllProductos = async () => {
    return await productoRepository.getProductos();    
};

let getProductobyfilter = async (filter,filtervalue) => {
    return await productoRepository.getProductos(filter,filtervalue);
};

let deleteProducto = async (id) => {
    return await productoRepository.deleteProducto({_id:id});
}

module.exports = {
    createProducto,
    deleteProducto,
    getAllProductos,
    getProductobyfilter,
    updateProducto
};
