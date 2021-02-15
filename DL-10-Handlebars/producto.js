const express = require('express');
const app = express();
const router = express.Router();
const handlebars = require('express-handlebars');

app.engine(
    "hbs", 
    handlebars({
        extname:".hbs",
        defaultLayout:"index.hbs",
        layoutsDir: __dirname + "/views/layouts/",
        partialsDir: __dirname + "/views/partials/",
    })
);

app.set("views", "./views");
app.set("view engine", "hbs");
app.use(express.static("public"));

/*router.get('/productos/vista',(req,res)=>{
    res.render("add", { productos: productos});
});*/

let item = require('./item');

//productos
let productos = [
    /*{
        id:1,
        title:"ruler",
        price:"100",
        thumbnail:"https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-128.png"
    }*/
];
let idGen = 1;

router.get("/productos/vista/:id",(req,res)=>{
    try{
        let producto = productos.find((producto) => {
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
    catch(err){
        res.json({error: err});
    }
});

router.get("/productos",(req,res)=>{
    try{
        if(productos.length > 0){
            res.json(productos);
        } else {
            res.json({error: 'no hay productos cargados'});
        }
    }
    catch(err){
        res.json({error: err});
    }
});

router.get("/productos/vista",(req,res)=>{
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
        res.render("add",{ productos: productos});
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
