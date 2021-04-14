const express = require('express');
const app = express();
app.use(express.json());

app.use('/api',router.set());

app.get("*", router.notFound());
app.post("*", router.notFound());
app.put("*", router.notFound());
app.delete("*", router.notFound());

app.get("/test", (req, res) => {
    res.send('Hi from Server');
});

//server
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT,()=>{
    console.log(`Server Up en Puerto: ${PORT}`);
});
server.on('error',error=> console.log(`Server Error: ${error}`));


app.get("/test", (req, res) => {
    res.json(generateArray());
});

let generateArray = () => {
    const nombres = ['Luis', 'Lucia', 'Juan', 'Augusto', 'Ana'];
    const apellidos = ['Pieres','Cacurri','Bezzola','Alberca','Mei'];
    const colores = ['rojo', 'verde', 'azul', 'amarillo', 'magenta'];
    let result = []
    for (let index = 0; index < 10; index++) {
        result.push(
            {
                nombre: nombres[Math.floor(Math.random() * (nombres.length))],
                apellido: apellidos[Math.floor(Math.random() * (apellidos.length))],
                color: colores[Math.floor(Math.random() * (colores.length))]
            }
        )
    }
    return result;

};
