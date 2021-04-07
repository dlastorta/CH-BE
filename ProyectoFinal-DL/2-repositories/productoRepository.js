const model = require('../models/producto');

let createProducto = (newProducto) =>{
    console.log('p rep');
    console.log(newProducto);
    const productoSaveModel = new model.productos(newProducto);
    let productoSave = productoSaveModel.save();
    return productoSave;
};

let getProductos = (filter, filterValue) =>{
    
};
let updateProducto = (producto) =>{
    
};

let deleteProducto = () =>{
    
};


module.exports = {
    createProducto,
    getProductos,
    updateProducto,
    deleteProducto
    
}