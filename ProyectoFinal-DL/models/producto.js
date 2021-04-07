const mongoose = require('mongoose');

const productosCollection = 'productos';

const ProductoSchema = new mongoose.Schema({
    timestamp : { type: Number },
    nombre : { type: String },
    descripcion : { type: String },
    codigo : { type: String },
    thumbnail : { type: String },
    precio : { type: Number },
    stock  : { type: Number }
}); 

module.exports = {productos : mongoose.model(productosCollection, ProductoSchema)}