const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://eeoadmin:3hzL2&66cT#NaJg@coderhouse.fclea.mongodb.net/eCommerce?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


let createProducto = (newProducto) =>{
    client.connect(err => {
        const collection = client.db("eCommerce").collection("Productos");
        collection.insertOne({
            timestamp : Date.now,
            nombre : newProducto.nombre,
            descripcion : newProducto.descripcion,
            codigo : newProducto.codigo,
            thumbnail : newProducto.thumbnail,
            precio : newProducto.precio,
            stock : newProducto.stock
        })
        client.close();
      });
      
};

let getProducto = (id) =>{
    client.connect(err => {
        const collection = client.db("eCommerce").collection("Productos");
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
let updateProducto = (producto) =>{
    client.connect(err => {
        const collection = client.db("eCommerce").collection("Productos");
        collection.updateOne(
            {_id: producto.id},
            { $set:{
                timestamp : Date.now,
                nombre : producto.nombre,
                descripcion : producto.descripcion,
                codigo : producto.codigo,
                thumbnail : producto.thumbnail,
                precio : producto.precio,
                stock : producto.stock
                }
            },
            (err)=>{
                if(err) throw err;
                return producto;                
            }           
        )
        client.close();
      });    
};
let deleteProducto = () =>{
    client.connect(err => {
        const collection = client.db("eCommerce").collection("Productos");
        collection.deleteOne(
            {_id: producto.id},
            (err)=>{
                if(err) throw err;
                return producto;                
            }           
        )
        client.close();
      });
};


module.exports = {
    createProducto,
    getProducto,
    updateProducto,
    deleteProducto
    
}