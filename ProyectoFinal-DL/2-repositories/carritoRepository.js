const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://eeoadmin:3hzL2&66cT#NaJg@coderhouse.fclea.mongodb.net/eCommerce?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


let createCarrito = () =>{
    client.connect(err => {
        const collection = client.db("eCommerce").collection("Carritos");
        collection.insertOne({
            timestamp: Date.now,
            productos: []
        })
        client.close();
      });
      
};

let getCarrito = (id) =>{
    client.connect(err => {
        const collection = client.db("eCommerce").collection("Carritos");
        collection.findOne(
            {_id: id},
            (err, result)=>{
                if(err) throw err;
                return result;                
            }           
        )
        client.close();
      });  
};
let updateCarrito = (carrito) =>{
    client.connect(err => {
        const collection = client.db("eCommerce").collection("Carritos");
        collection.updateOne(
            {_id: carrito.id},
            { $set:{
                timestamp: Date.now,
                productos: carrito.productos
                }
            },
            (err)=>{
                if(err) throw err;
                return carrito;                
            }           
        )
        client.close();
      });    
};
let deleteCarrito = () =>{
    client.connect(err => {
        const collection = client.db("eCommerce").collection("Carritos");
        collection.deleteOne(
            {_id: carrito.id},
            (err)=>{
                if(err) throw err;
                return carrito;                
            }           
        )
        client.close();
      });
};


module.exports = {
    createCarrito,
    getCarrito,
    updateCarrito,
    deleteCarrito
    
}