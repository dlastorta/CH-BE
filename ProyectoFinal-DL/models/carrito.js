const mongoose = require('mongoose');

const carritosCollection = 'carritos';

const CarritoSchema = new mongoose.Schema({
    timestamp : { type: Number }    
}); 

module.exports = {carritos : mongoose.model(carritosCollection, CarritoSchema)}  