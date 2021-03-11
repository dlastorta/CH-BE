const express = require('express');
const router = express.Router();

//servicios
let productoService = require('../service/productoService');
let adminService = require('../service/adminService');

//productos
router.post("/agregar", (req, res) => {
    if (!adminService.isAdmin) {
        res.json({
            error: -1,
            descripcion: `Productos ${req.path} no autorizada`
        });
    } else {
        try {
            let newProducto = productoService.createProducto(
                req.body.nombre,
                req.body.descripcion,
                req.body.codigo,
                req.body.thumbnail,
                req.body.precio,
                req.body.stock
            );
            res.json(newProducto);
        } catch (err) {
            console.log(err);
            res.json({
                error: "Error salvando producto"
            });
        }
    }
});

router.get("/listar/:id?", (req, res) => {
    try {
        if (!req.params.id) {
            let productos = productoService.getProductos();
            res.json(productos);
        }

        let producto = productoService.getProductobyId(req.params.id);
        if (producto) {
            console.log('existe');
            res.json(producto);
        } else {
            res.json({
                error: 'producto no encontrado'
            });
        }
    } catch (err) {
        res.json({
            error: err
        });
    }
});

router.put("/actualizar/:id", (req, res) => {
    let id = req.params.id;
    let data = req.body;
    if (!adminService.isAdmin) {
        res.json({
            error: -1,
            descripcion: `Productos ${req.path} no autorizada`
        });
    } else {
        try {
            let producto = productoService.updateProducto(id, data);
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
            let producto = productoService.borrarProducto(id);
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

module.exports = router;
