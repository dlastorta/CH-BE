const express = require('express');
const app = express();
const router = express.Router();

let productoService = require('../1-service/productoService');
let carritoService = require('../1-service/carritoService');
let carro = carritoService.createCarrito();

router.get("/listar/:id?",(req,res)=>{
    try{
        if(!req.params.id){
            res.json(carro.productos);
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
        let producto = productoService.getProductobyId(req.params.id_producto)
        if(producto){
            carro.productos.push(producto);
            carritoService.updateCarrito(carro);
            res.json(producto);
        }
        else {
            res.json({error: 'producto no encontrado'});
        }
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
            carritoService.updateCarrito(carro);
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

