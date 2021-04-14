const express = require('express');
const router = express.Router();
const faker = require('faker');
faker.locale = 'es';

//servicios
let productoService = require('../1-service/productoService');
let adminService = require('../1-service/adminService');
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

router.get('/vista-test/:cant?',(req,res)=>{
    let cant = req.params.cant || 10;
    let productos = [];
    for (let i = 0; i < cant; i++) {
        let producto = {
            id : faker.datatype.uuid(),
            timestamp : faker.date.past(1),
            nombre : faker.random.words(),
            descripcion : faker.random.words(),
            codigo : faker.random.alphaNumeric(8),
            thumbnail : faker.random.image(),
            precio : faker.finance.amount(100, 5000),
            stock : faker.datatype.number(500)
        };
        productos.push(producto);        
    }
    res.send(productos);
});

module.exports = router;
