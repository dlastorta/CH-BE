const { json } = require('body-parser');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

const items = require('./item');
let item = items.Item;

//server
const PORT = 8080;
const server = app.listen(PORT,()=>{
    console.log(`Server Up en Puerto: ${PORT}`);
});
server.on('error',error=> console.log(`Server Error: ${error}`));

//productos
let productos = [];
let idGen = 1;

app.get("/productos/:id",(req,res)=>{
    try{
        let producto = productos.find((producto) => {
            if(producto.id == req.params.id) {
                return producto;
            }
        });
        if(producto){
            res.json(producto);
        }
        else {
            res.json({error: 'producto no encontrado'});
        }
    }
    catch(err){
        res.json({error: err});
    }
});

app.get("/productos",(req,res)=>{
    try{
        if(productos.length > 0){
            res.json(productos);
        } else {
            res.json({error: 'no hay productos cargados'});
        }
    }
    catch(err){
        res.json({error: err});
    }
});

app.post("/productos", (req,res)=>{
    try{
        let newItem = new item(
            idGen,
            req.body.title,
            req.body.price,
            req.body.thumbnail
        );
    productos.push(newItem);
    idGen++;
    res.json(`Item Creado: ${JSON.stringify(newItem)}`);
    }
    catch(err){
        console.log(err);
        res.json({error: "error salvando producto"});
    }
});

app.put("/productos/:id", (req,res)=>{
    try{
        let indice = productos.findIndex((producto) => producto.id == req.params.id);
        if(indice){
            productos[indice].title = req.body.title;
            productos[indice].price = req.body.price;
            productos[indice].thumbnail = req.body.thumbnail;
            
            res.json('Producto Actualizado' + JSON.stringify(productos[indice]));
        }
        else {
            res.json({error: 'Producto no encontrado'});
        }
    }
    catch(err){
        res.json({error: "Error actualizando producto"});
    }
});

app.delete("/productos/:id", (req,res)=>{
    try{
        let indice = productos.findIndex((producto) => producto.id == req.params.id);
        if(indice){
            let producto = productos[indice]
            productos.splice(indice, 1);
            res.json('Producto Borrado' + JSON.stringify(producto));
        }
        else {
            res.json({error: 'Producto no encontrado'});
        }
    }
    catch(err){
        res.json({error: "Error actualizando producto"});
    }
});

