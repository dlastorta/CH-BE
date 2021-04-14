const express = require('express');
const router = express.Router();
const api = require('../api/usuarios');

const notFound = (req,res) => {
    let {url} = req;
    let {method} = req;
    res.send(`Ruta ${method} ${url}`);
}

let set = () =>{
    router.get('/generar/:cant?', api.generar);
    router.get('/:id?', api.get);
    router.post('/', api.get);
    router.put('/:id', api.put);
    router.delete('/:id', api.del);

    return router;
}

module.exports = {
    set,
    notFound
}