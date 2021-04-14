const { options } = require('../3-DB/connections/sqlite3.db');
const knex = require('knex')(options);

knex.schema.hasTable('Carrito').then(function(exists) {
    if(!exists){
            knex.schema.createTable('Carrito', table =>{
            table.increments('id'),
            table.time('timestamp')
        })
    .then(()=> console.log('table Carrito created!'))
    .catch((err)=>{console.log(err);throw err})
    .finally(()=>{knex.destroy()});
    }    
});

knex.schema.hasTable('ProductosCarrito').then(function(exists) {
    if(!exists){
        knex.schema.createTable('ProductosCarrito', table =>{
            table.uuid('idCarrito'),
            table.uuid('idProducto')    
        })
        .then(()=> console.log('table ProductosCarrito created!'))
        .catch((err)=>{console.log(err);throw err})
        .finally(()=>{knex.destroy()})
    }
});


let createCarrito = () =>{
    knex('Carrito')
        .insert({
            timestamp: Date.now()
        })
}


const fs = require("fs");
const file = "./storage/carritos.json";

let writeFile = (data) =>{
    fs.writeFile(file,JSON.stringify(data),(err)=>{
        if(err){
            console.log(err)
        } else {
            console.log('Carrito Guardado');
        }
        
    });
}



module.exports = {
    createCarrito,
    writeFile
}