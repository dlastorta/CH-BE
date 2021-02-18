const express = require('express');
const app = express();
const router = express.Router();

app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.static("public"));

let item = require('./item');

//productos
let productos = [
    new item(0,
        "ruler",
        "100",
        "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-128.png")
];
let idGen = 1;

router.get("/productos",(req,res)=>{
    try{
        if(productos.length > 0){
            res.render('/', {productos: productos});
        } else {
            res.json({error: 'no hay productos cargados'});
        }
    }
    catch(err){
        res.json({error: err});
    }
});

router.get("/productos/items/:id",(req,res)=>{
    try{
        let producto = productos.find((producto) => {
            if(producto.id == req.params.id) {
                return producto;
            }
        });
        if(producto){
            res.render('/item', {producto: producto});            
        }
        else {
            res.json({error: 'producto no encontrado'});
        }
    }
    catch(err){
        res.json({error: err});
    }
});


router.get("/productos/vista",(req,res)=>{
    console.log(productos);
    res.render("vista",{ productos: productos});
  });

router.get("/productos/add",(req,res)=>{
  res.render("add",{});
});

router.post("/productos", (req,res)=>{
    try {
        let newItem = new item(
            idGen,
            req.body.title,
            req.body.price,
            req.body.thumbnail
        );
        productos.push(newItem);
        idGen++;
        res.render("vista",{ productos: productos});
    }
    catch(err){
        console.log(err);
        res.json({error: "error salvando producto"});
    }
});

router.put("/productos/:id", (req,res)=>{
    try{
        let producto = productos.find(producto => producto.id == req.params.id);
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

router.delete("/productos/:id", (req,res)=>{
    try{
        let indice = productos.findIndex(producto => producto.id == req.params.id );
        console.log(indice);
        if(indice && indice > -1){ 
            let producto = productos[indice]
            productos.splice(indice, 1);
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
