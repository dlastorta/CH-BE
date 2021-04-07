const express = require('express');
const router = express.Router();

//servicios
let productoService = require('../1-service/productoService');
let adminService = require('../1-service/adminService');
let Producto = require('../entities/producto')
let isAdmin = adminService.isAdmin;
//productos
router.post("/agregar", (req, res) => {
    if (!isAdmin) {
        res.json({
            error: -1,
            descripcion: `Productos ${req.path} no autorizada`
        });
    } else {
        try {
            let newProducto = new Producto(
                Date.now(), 
                req.body.nombre,
                req.body.descripcion,
                req.body.codigo,
                req.body.thumbnail,
                req.body.precio,
                req.body.stock);
            let producto = productoService.createProducto(newProducto);
            res.json(producto);
        } catch (err) {
            console.log(err);
            res.json({
                error: "Error creando producto"
            });
        }
    }
});

router.get("/listar/:id?", (req, res) => {
    try {
        if (!req.params.id) {
            productoService.getAllProductos()
            .then((productos)=>{
                console.log("repo")
                console.log(productos)
                res.json(productos);
            });
        } else {
            let producto = productoService.getProductobyId(req.params.id);
            if (producto) {
                res.json(producto);
            } else {
                res.json({
                    error: 'producto no encontrado'
                });
            }
        }
        
    } catch (err) {
        res.json({
            error: err
        });
    }
});

router.put("/actualizar/:id", (req, res) => {
    if (!adminService.isAdmin) {
        res.json({
            error: -1,
            descripcion: `Productos ${req.path} no autorizada`
        });
    } else {
        try {
            let producto = productoService.updateProducto(req.params.id, req.body);
            if (producto) {
                res.json(producto);
            } else {
                res.json({
                    error: 'Producto no encontrado'
                });
            }
        } catch (err) {
            res.json({
                error: "Error actualizando producto " + err
            });
        }
    }
});

router.delete("/borrar/:id", (req, res) => {
    if (!adminService.isAdmin) {
        res.json({
            error: -1,
            descripcion: `Productos ${req.path} no autorizada`
        });
    } else {
        try {
            let producto = productoService.borrarProducto(req.params.id);
            if (producto) {
                res.json(producto);
            } else {
                res.json({
                    error: 'Producto no encontrado'
                });
            }
        } catch (err) {
            res.json({
                error: "Error eliminando producto " + err
            });
        }
    }
});

module.exports = router;
