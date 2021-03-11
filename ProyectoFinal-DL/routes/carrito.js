const express = require('express');
const app = express();
const router = express.Router();

let producto = require('../service/productoService');
let carritoService = require('../service/carritoService');
const Carrito = require('../entities/carrito');

    
//carrito
let carro = carritoService.createCarrito();

router.get("/listar/:id",(req,res)=>{
    try{
        if(!req.params.id){
            res.json(carrito);
        } else {
            let producto = carro.productos.find((producto) => {
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

router.post("/agregar/:id_producto", (req,res)=>{
    try{
        let producto = productList.find((producto) => {
            if(producto.id == req.params.id_producto) {
                return producto;
            }
        });
        carro.productos.push(producto);
        res.json(`Item agregado: ${JSON.stringify(newProducto)}`);
    }
    catch(err){
        console.log(err);
        res.json({error: "Error agregando producto"});
    }
});

router.delete("/borrar/:id", (req,res)=>{
    try{
        let indice = carro.productos.findIndex(producto => producto.id == req.params.id );
        if(indice && indice > -1){ 
            let producto = carro.productos[indice]
            carro.productos.splice(indice, 1);
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

