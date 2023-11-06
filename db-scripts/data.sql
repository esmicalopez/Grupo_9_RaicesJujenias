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

-- Productos
INSERT INTO products (name, price, description, stock, category_id) VALUES
('Poncho de Lana', 120, 'Poncho tradicional de lana tejido a mano', 10, 4),
('Mate de Calabaza', 35, 'Mate de calabaza con bombilla de alpaca', 50, 1),
('Cuchillo Artesanal', 80, 'Cuchillo criollo artesanal de hoja de acero', 15, 1),
('Boleadoras Gauchas', 50, 'Boleadoras tradicionales para doma', 12, 3);

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
('Grande'),
('Mediano'),
('Chico'),
('XS'),
('S'),
('M'),
('L'),
('XL'),
('XXL');

-- Product_size
INSERT INTO product_size (product_id, size_id) VALUES
(1, 4),
(1, 5),
(1, 6),
(1, 8),
(2, 2),
(2, 3),
(3, 1),
(3, 2),
(3, 3),
(4, 1),
(4, 2),
(4, 3);


-- Product_color
INSERT INTO product_color (product_id, color_id) VALUES
(1, 8),
(1, 11),
(1, 9),
(1, 10),
(1, 17),
(2, 2),
(2, 3),
(2, 14),
(2, 6),
(3, 17),
(3, 8),
(4, 17),
(4, 9),
(4, 8);


-- User_product SOLO PARA LOS USUARIOS 'ADMIN'
INSERT INTO user_product (product_id, user_id) VALUES
(3, 1),
(2, 1),
(4, 5),
(1, 2);


-- IMG de los productos
INSERT INTO images (name, product_id, color_id) VALUES 
('mate-V-Frente', 2, 2),
('mate-V-Superior', 2, 2),
('mate-V-Frente', 2, 14),
('mate-V-Superior', 2, 14);

