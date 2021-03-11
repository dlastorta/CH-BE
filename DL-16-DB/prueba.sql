CREATE DATABASE prueba;
CREATE TABLE IF NOT EXISTS items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(40) NOT NULL,
    categoria VARCHAR(40) NOT NULL,
    stock INT UNSIGNED NOT NULL
    ) ENGINE=INNODB;

INSERT INTO items (nombre, categoria, stock) VALUES ('Fideos','Harina', 20);
INSERT INTO items (nombre, categoria, stock) VALUES ('Leche','Lacteos', 30);
INSERT INTO items (nombre, categoria, stock) VALUES ('Crema','Lacteos', 15);

select * from items

delete * from items where id=1;

update items set stock=45 where id=2;

select * from items