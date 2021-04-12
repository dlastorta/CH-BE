const model = require('../models/producto');

let createProducto = async (data) =>{
    const productoSaveModel = new model.productos(data);
    return producto = await productoSaveModel.save();     
};

let getProductos = async (filter, filterValue) =>{
    let query = {}
    if(filter !== null || filter  === 'undefined'){
        query[filter] = filterValue;
    }
    return await model.productos.find(query, (err, productos)=>{
        if(err){
            throw err;            
        }
        console.log('repo');
        console.log(productos);
    });
};
let updateProducto = async (id, data) =>{
    return model.productos.updateOne(
        {_id: id},
        {$set:{
            timestamp: Date.now(), 
            nombre: data.nombre,
            descripcion: data.descripcion,
            codigo: data.codigo,
            thumbnail: data.thumbnail,
            precio: data.precio,
            stock: data.stock
        }}
    ).then(
        async ()=>{
            return await model.productos.find({_id: id}).then(
            (uProducto)=>{
                return uProducto
        });            
    });
};

let deleteProducto = async (id) =>{
    let productoBorrado = await model.productos.find({_id: id});
    await model.productos.deleteOne({_id:id});
    return productoBorrado;
    
};

module.exports = {
    createProducto,
    getProductos,
    updateProducto,
    deleteProducto
}