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

let getProductobyId = (id) => {
    return productos.find((producto) => {
        if (producto.id == id) {
            return producto;
        }
    })
};

let updateProducto = (id, data) => {
    let producto = productos.find(producto => producto.id == req.params.id)
    if (producto) {
        producto.timestamp = Date.now,
        producto.nombre = data.nombre,
        producto.descripcion = data.descripcion,
        producto.codigo = data.codigo,
        producto.thumbnail = data.thumbnail,
        producto.precio = data.precio,
        producto.stock = data.stock
        return producto;
    }
}

let borrarProducto = (id) => {
    let indice = productList.findIndex(producto => producto.id == req.params.id);
    if (indice && indice > -1) {
        let producto = productList[indice]
        productos.splice(indice, 1);
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
