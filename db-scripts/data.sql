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
('artesania', 1),
('hogar', 5),
('Moda', 6);


-- Colores
INSERT INTO colors (name) VALUES
('Rojo'),
('Bordo'),
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
('Marron'),
('Marron Claro'),
('Gris'),
('Gris Oscuro');


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
('Termo Stanley', 'TERMO STANLEY 950ml CON MANIJA Y TAPÓN CEBADOR\nDiseño elegante, construcción robusta y una actitud indescriptible. Totalmente a prueba de fugas y capaz de mantener las bebidas calientes durante 24 horas o frías durante 34 horas. Con el termo Stanley nunca tendrás que preocuparte que el agua se enfríe o que tu bebida se caliente. Gracias a su pared', 5),
('Vino torrontés', '900ml Vino blanco de uvas torrontés, producido en Jujuy.', 5),
('Cuchillo Trento Gourmet 8 Madera Asador', 'El mango está fabricado con madera. La hoja está fabricada en acero inoxidable. El tipo de apertura de la hoja es fija. El largo de la hoja es de 20cm.', 4),
('Set Matero, Boca Junior ', ' Kit matero grande', 1),
('Zamponia', 'Instrumento hecho a mano por músicos locales.', 4),
('Sombrero Redondo Campo Gaucho ', '-- SOMBRERO MODELO PLATO REDONDO\r\n-- MARCA LAGOMARSINO , MAS DE 100 AÑOS FABRICANDO SOMBREROS\r\n-- PELO DE LIEBRE\r\n-- ALA 10 CMS\r\n-- TALLE S AL XXL\r\n\r\nTU CONSULTA NO MOLESTA', 6),
('Bolso Matero Un Buen Mate Porta Mate Termo Original', 'Bolso matero negro para hombre y mujer con base semirrígida y tira regulable confeccionado en tela antihongos y resistente al agua, con amplio compartimento principal sin divisiones y bolsillo externo. Gracias a su diseño clásico, casual y moderno es perfecto para acompañarte a cualquier destino y llevar todo comodamente en tu matera.\r\n\r\nEl interio', 6),
('Set Matero Completo Bolso Rígido', 'Termo De 1 Litro Acero Inoxidable De Excelente Calidad , Latas , Mate Y Bombilla\r\nEl set incluye la canasta o el bolso matero según foto, el mate, la bombilla, el termo de 1 litro de acero y doble capa, la azucarera y la yerbera con vertedor plástico.-\r\n\r\nProducto artesanal.-\r\n\r\n--ADEMAS--\r\nLocal en pleno centro comercial de Martín Coronado abierto', 5),
('Dulces de cayote', 'Deliciosos dulces de cayote, típicos de Jujuy.', 2),
('Bombacha Gaucho ', 'LIQUIDACION!!!! ULTIMAS UNIDADES\r\n\r\nPRENDAS SIN FALLAS EN PERFECTO ESTADO!\r\n\r\nGarantía del vendedor: 5 días', 4),
('Alpargata Banderita', 'ALPARGATA CLÁSICA DE VERANO\r\n\r\nColores disponibles: Negro, verde, bordo, azul, rojo, coral y jean.\r\n\r\nTalles: 35 al 44.\r\n\r\nMateriales: Fabricadas con lona resistente en su exterior y suela de goma símil yute que garantizan durabilidad y comodidad durante todo el día.\r\n\r\nOrigen: ARGENTINA\r\n\r\n* Se recomienda elegir un talle menos al usado en zapatill', 6);

-- Product_detail
INSERT INTO product_detail (product_id, color_id, size_id, stock, price) VALUES
(1, 8, 4, 10, 1500),
(1, 11, 5, 15, 1500),
(1, 9, 6, 15, 1500),
(1, 10, 8, 10, 1500),
(1, 17, 2, 12, 1500),
(2, 9, 3, 34, 64000),
(3, 17, 3, 8, 1800),
(3, 9, 5, 15, 1800),
(3, 8, 1, 10, 1800),
(4, 17, 2, 19, 25730),
(5, 9, 2, 321, 8491),
(6, 17, 1, 10, 800),
(6, 8, 2, 10, 800),
(7, 18, 7, 34, 132192), 
(8, 9, 3, 31, 8491), 
(9, 18, 2, 192, 26003), 
(10, 2, 3, 10, 1200),
(10, 3, 1, 12, 1200),
(10, 14, 2, 12, 1200),
(10, 6, 3, 8, 1200), 
(11, 18, 7, 24, 25000),
(12, 1, 7, 41, 5790);


-- User_product SOLO PARA LOS USUARIOS 'ADMIN'
INSERT INTO user_product (product_id, user_id) VALUES
(1, 2),
(2, 1),
(3, 1),
(4, 5),
(5, 1),
(6, 2),
(7, 1),
(8, 1),
(9, 1),
(10, 1),
(11, 1),
(12, 1);


-- IMG de los productos
INSERT INTO images (name, product_detail_id) VALUES 
('poncho.png', 1),
('Termo-Stanley.png', 6),
('Termo-Stanley-2.png', 6),
('Termo-Stanley-tapa.png', 6),
('Termo-Stanley-tapa-2.png', 6),
('Termo-Stanley-medidas.png', 6),
('vino.png', 7),
('cuchillo.png', 10),
('cuchillo-2.png', 10),
('cuchillo-fondo.png', 10),
('cuchillo-fondo-2.png', 10),
('Set Matero-Boca-Junior.png', 11),
('Set Matero-Boca-Junior-3.png', 11),
('Set Matero-Boca-Junior-2.png', 11),
('zamponia.png', 12),
('Sombrero-Redondo.png', 14),
('Sombrero-Redondo-2.png', 14),
('Bolso-Matero.png', 15),
('Bolso-Matero-2.png', 15),
('Bolso-Matero-3.png', 15),
('Bolso-Matero-medidas.png', 15),
('Set-Matero.png', 16),
('Set-Matero-2.png', 16),
('Set-Matero-medidas.png', 16),
('dulce-cayote.png', 17),
('Bombacha-Gaucho.png', 21),
('Bombacha-Gaucho-medidas.png', 21),
('Bombacha-Gaucho-2.png', 21),
('alpargatas.png', 22),
('alpargatas-2.png', 22),
('alpargatas-3.png', 22);

