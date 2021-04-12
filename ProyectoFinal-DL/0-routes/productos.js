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
            productoService.createProducto(newProducto).then((producto)=>{
                res.json(producto)
            });
            
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
                res.json(productos);
            });
        } else {
            productoService.getProductobyfilter("_id",req.params.id)
            .then((producto)=>{
                if (producto) {
                    res.json(producto);
                } else {
                    res.json({
                        error: 'Producto no encontrado'
                    });
                }
            });            
        }
    } catch (err) {
        res.json({
            error: err
        });
    }
});

router.get("/listar/:id?/filtro/:filter?", (req, res) => {
    try {
        if (!req.params.id) {
            productoService.getAllProductos()
            .then((productos)=>{                
                res.json(productos);
            });
        } else {
            productoService.getProductobyfilter(req.params.filter,req.params.id)
            .then((producto)=>{
                if (producto) {
                    res.json(producto);
                } else {
                    res.json({
                        error: 'Producto no encontrado'
                    });
                }
            });            
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
            productoService.updateProducto(req.params.id, req.body)
            .then((producto)=>{
                if (producto) {
                    console.log("ruta");
                    console.log(producto)
                    res.json(producto);
                } else {
                    res.json({
                        error: 'Producto no encontrado'
                    });
                }
            });
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
            productoService.deleteProducto(req.params.id)
            .then((producto)=>{
                if (producto) {
                    res.json(producto);
                } else {
                    res.json({
                        error: 'Producto no encontrado'
                    });
                }
            });
        } catch (err) {
            res.json({
                error: "Error actualizando producto " + err
            });
        }
    }
});

module.exports = router;
