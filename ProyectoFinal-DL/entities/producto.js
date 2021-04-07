class Producto {
    constructor(timestamp, nombre, descripcion, codigo, thumbnail, precio, stock) {
        this.timestamp = timestamp,
        this.nombre = nombre,
        this.descripcion = descripcion,
        this.codigo = codigo,
        this.thumbnail = thumbnail,
        this.precio = precio,
        this.stock = stock
    }
}

module.exports = Producto;