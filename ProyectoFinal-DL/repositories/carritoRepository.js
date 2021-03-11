const fs = require("fs");
const file = "./storage/carritos.json";

let writeFile = (data) =>{
    fs.writeFile(file,JSON.stringify(data),(err)=>{
        if(err){
            console.log(err)
        } else {
            console.log('Carrito Guardado');
        }
        
    });
}

module.exports = {
    writeFile
}