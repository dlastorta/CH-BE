const getIndex = (id, usuarios) =>{ 
    usuarios.findIndex(usuario => {
        return usuario.id === id 
    });
};

const getFecha = () => new Date().toLocaleString();
const getNextId = usuarios => usuarios.length ? (usuarios[usuarios.length-1].id +1) : 1;

module.exports = {
    getIndex,
    getFecha,
    getNextId    
}