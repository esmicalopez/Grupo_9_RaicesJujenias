use raices_jujenias;

--  --- -- DATOS DE LA BD

INSERT INTO preferences (name) VALUES
('ingles'),
('español');


INSERT INTO roles (name) VALUES
('admin'),
('user');


INSERT INTO users (name, last_name, email, password, preference_id, rol_id) VALUES
('Cristian', 'Zamora', 'cristian@gmail.com', 'cristian123', 2, 1),
('Juan', 'Pérez', 'juan.perez@example.com', 'juan123', 1, 1),
('María', 'Rodríguez', 'maria.rodriguez@example.com', 'maria123', 1, 2),
('Carlos', 'González', 'carlos.gonzalez@example.com', 'carlos123', 2, 2),
('Laura', 'Fernández', 'laura.fernandez@example.com', 'laura123', 2, 1),
('Diego', 'López', 'diego.lopez@example.com', 'diego123', 1, 2);


-- Categorias
INSERT INTO categories (name, ranking) VALUES
('arte', 3),
('gastronomia', 2),
('textiles', 4),
('artesania', 1);


-- Colores
INSERT INTO colors (name) VALUES
('Rojo'),
('Azul'),
('Verde'),
('Amarillo'),
('Naranja'),
('Rosa'),
('Morado'),
('Blanco'),
('Negro'),
('Azul Marino'),
('Azul Oscuro'),
('Verde Lima'),
('Verde Esmeralda'),
('Amarillo Claro'),
('Naranja Brillante'),
('Rosa Pálido'),
('Marron');


-- Tamaños
INSERT INTO sizes (name) VALUES
('Unico'),
('Grande'),
('Mediano'),
('Chico'),
('XS'),
('S'),
('M'),
('L'),
('XL'),
('XXL');


-- Productos
INSERT INTO products (name, description, category_id) VALUES
('Poncho de Lana', 'Poncho tradicional de lana tejido a mano', 4),
('Dulces de cayote', 'Deliciosos dulces de cayote, típicos de Jujuy.', 1),
('Zamponia', 'Instrumento hecho a mano por músicos locales.', 3),
('Vino torrontés', '900ml Vino blanco de uvas torrontés, producido en Jujuy.', 2);


-- Product_detail
INSERT INTO product_detail (product_id, color_id, size_id, stock, price) VALUES
(1, 8, 4, 10, 1500),
(1, 11, 5, 15, 1500),
(1, 9, 6, 15, 1500),
(1, 10, 8, 10, 1500),
(1, 17, 2, 12, 1500),
(2, 2, 3, 10, 1200),
(2, 3, 1, 12, 1200),
(2, 14, 2, 12, 1200),
(2, 6, 3, 8, 1200),
(3, 17, 1, 10, 800),
(3, 8, 2, 10, 800),
(4, 17, 3, 8, 1800),
(4, 9, 5, 15, 1800),
(4, 8, 1, 10, 1800);


-- User_product SOLO PARA LOS USUARIOS 'ADMIN'
INSERT INTO user_product (product_id, user_id) VALUES
(3, 1),
(2, 1),
(4, 5),
(1, 2);


-- IMG de los productos
INSERT INTO images (name, product_detail_id) VALUES 
('poncho.png', 1),
('dulce-cayote.png', 6),
('zamponia.png', 10),
('vino.png', 12);

