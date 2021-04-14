const { options } = require('../3-DB/connections/sqlite3.db');
const knex = require('knex')(options);
const Producto = require('../entities/producto');

knex.schema.hasTable('Productos').then(function(exists) {
    if(!exists){
        knex.schema.createTable('Productos', table =>{
            table.increments('id'),
            table.time('timestamp'),
            table.string('nombre'),
            table.string('descripcion'),
            table.string('codigo'),
            table.string('thumbnail'),
            table.float('precio'),
            table.integer('stock')
        })
        .then(()=> console.log('table Producto created!'))
        .catch((err)=>{console.log(err); throw err})
        .finally(()=>{knex.destroy()})
    }
});

let createProducto = (producto) => {
    knex.insert(
        {
            timestamp: producto.timestamp,
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            codigo: producto.codigo,
            thumbnail: producto.thumbnail,
            precio: producto.precio,
            stock: producto.stock
        }
    )
    .returning('id')
    .into('Productos')
    .then(
        (id) => {
            return id;
        }
    )    
}

let getAllProductos = () => {
    let productos = [];
    knex.from('Productos').select("*")
    .then((rows)=>{
        for (row of rows){
            productos.push(
                new Producto(row['id'],row['timestamp'],row['nombre'],row['descripcion'],row['codigo'],row['thumbnail'],row['precio'],row['stock'])
            );
        }
        return productos;
    })
    .catch((err)=> {
         console.log(err);
         throw err
        })
    .finally(() => 
        knex.destroy()
    )
};

module.exports = {
    createProducto,
    getAllProductos
}