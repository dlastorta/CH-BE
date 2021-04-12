const express = require('express');
const app = express();
const router = express.Router();

let productoService = require('../1-service/productoService');
let carritoService = require('../1-service/carritoService');
let carrito = {};

router.post("/crear",(req,res)=>{
    try{
        
        carritoService.createCarrito().then(carro => {
            carrito = carro;
            res.json(carro)
        });
        
    }
    catch(err){
        res.json({error: err});
    }
});

router.post("/agregar/:id_producto", (req,res)=>{
    try{
        let producto = productoService.getProductobyId(req.params.id_producto).then(
            (producto)=>{
                if(producto !== null){
                    carrito.producto.push(producto);
                    carritoService.updateCarrito(carrito);
                    res.json(producto);
                }
                else {
                    res.json({error: 'producto no encontrado'});
                }
            }
        )
    }
    catch(err){
        console.log(err);
        res.json({error: "Error agregando producto"});
    }
});

router.get("/listar/:id?",(req,res)=>{
    try{
        if(!req.params.id){
            res.json(carrito.productos);
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

router.delete("/borrar/producto/:id", (req,res)=>{
    try{
        let indice = carrito.productos.findIndex(producto => producto.id == req.params.id );
        if(indice && indice > -1){ 
            let producto = carrito.productos[indice]
            carrito.productos.splice(indice, 1);
            carritoService.updateCarrito(carrito);
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

router.delete("/borrar/:id", (req,res)=>{
    try {
        carritoService.deleteCarrito(carrito);
        res.json(producto);
    }
    catch(err){
        res.json({error: "Error eliminando carrito" + err});
    }
});

module.exports = router;

