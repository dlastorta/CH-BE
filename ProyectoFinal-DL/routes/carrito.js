const express = require('express');
const router = express.Router();

let item = require('./item');

//carrito
let carrito = [];
let idGen = 1;

router.get("/listar/:id",(req,res)=>{
    try{
        if(!req.params.id){
            res.json(carrito);
        } else {
            let producto = carrito.find((producto) => {
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
    }
    catch(err){
        res.json({error: err});
    }
});

router.post("/agregar", (req,res)=>{
    try{
        let newItem = new item(
            idGen,
            req.body.title,
            req.body.price,
            req.body.thumbnail
        );
    carrito.push(newItem);
    idGen++;
    res.json(`Item Creado: ${JSON.stringify(newItem)}`);
    }
    catch(err){
        console.log(err);
        res.json({error: "error salvando producto"});
    }
});

router.put("/actualizar/:id", (req,res)=>{
    try{
        let producto = carrito.find(producto => producto.id == req.params.id);
        if(producto){
            producto.title = req.body.title;
            producto.price = req.body.price;
            producto.thumbnail = req.body.thumbnail;
            res.json(producto);
        }
        else {
            res.json({error: 'Producto no encontrado'});
        }
    }
    catch(err){
        res.json({error: "Error actualizando producto " + err});
    }
});

router.delete("/borrar/:id", (req,res)=>{
    try{
        let indice = carrito.findIndex(producto => producto.id == req.params.id );
        console.log(indice);
        if(indice && indice > -1){ 
            let producto = carrito[indice]
            carrito.splice(indice, 1);
            res.json(producto);
        }
        else {
            res.json({error: 'Producto no encontrado'});
        }
    }
    catch(err){
        res.json({error: "Error actualizando producto " + err});
    }
});

module.exports = router;
