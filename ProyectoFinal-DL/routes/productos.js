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
            res.json(productoService.getProducts());
        }
        let producto = productList.find((producto) => {
            if (producto.id == req.params.id) {
                return producto;
            }
        });
        if (producto) {
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
    if (!isAdmin) {
        res.json({
            error: -1,
            descripcion: `Productos ${req.path} no autorizada`
        });
    } else {
        try {
            let producto = productList.find(producto => producto.id == req.params.id);
            if (producto) {
                producto.title = req.body.title;
                producto.price = req.body.price;
                producto.thumbnail = req.body.thumbnail;
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
    if (!isAdmin) {
        res.json({
            error: -1,
            descripcion: `Productos ${req.path} no autorizada`
        });
    } else {
        try {
            let indice = productList.findIndex(producto => producto.id == req.params.id);
            console.log(indice);
            if (indice && indice > -1) {
                let producto = productList[indice]
                productList.splice(indice, 1);
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
