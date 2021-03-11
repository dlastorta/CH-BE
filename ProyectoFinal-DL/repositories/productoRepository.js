const fs = require("fs");
const file = "./storage/productos.json";

let writeFile = (data) =>{
    fs.writeFile(file,JSON.stringify(data),(err)=>{
        if(err){
            console.log(err)
        } else {
            console.log('Productos Guardados');
        }
    });
}

module.exports = {
    writeFile
}