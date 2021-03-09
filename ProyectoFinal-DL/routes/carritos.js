const express = require('express');
const router = express.Router();

let producto = require('./classes/producto');
let carrito = require('./classes/carrito');
//
let isAdmin = app.get('isAdmin');
let idGenCarro = app.get('idGenCarro');
let idGenProducto = app.get('idGenProducto');
    
//carrito
let carrito = new carrito(idGenCarro, Date.now);

router.get("/listar/:id",(req,res)=>{
    try{
        if(!req.params.id){
            res.json(carrito);
        } else {
            let producto = carrito.productos.find((producto) => {
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
        let newProducto = new producto(
            req.body.id,
            req.body.timestamp,
            req.body.nombre,
            req.body.descripcion,
            req.body.codigo,
            req.body.thumbnail,
            req.body.precio,
            req.body.stock 
            
        );
    carrito.push(newProducto);
    res.json(`Item agregado: ${JSON.stringify(newProducto)}`);
    }
    catch(err){
        console.log(err);
        res.json({error: "Error agregando producto"});
    }
});

router.delete("/borrar/:id", (req,res)=>{
    try{
        let indice = carrito.productos.findIndex(producto => producto.id == req.params.id );
        if(indice && indice > -1){ 
            let producto = carrito.productos[indice]
            carrito.productos.splice(indice, 1);
            res.json(producto);
        }
        else {
            res.json({error: 'Producto no encontrado'});
        }
    }
    catch(err){
        res.json({error: "Error eliminando carrito" + err});
    }
});

module.exports = router;

