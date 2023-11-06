DROP DATABASE IF EXISTS raices_jujenias;

CREATE DATABASE raices_jujenias;

use raices_jujenias;

CREATE TABLE preferences (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
	PRIMARY KEY(id)
);

CREATE TABLE roles (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
	PRIMARY KEY(id)
);

CREATE TABLE users (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    last_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(400) NOT NULL,
    avatar VARCHAR(400) DEFAULT 'default-avatar.png',
    register_date TIMESTAMP DEFAULT NOW(),
    preference_id INT UNSIGNED NOT NULL, 
    rol_id INT UNSIGNED NOT NULL, 
    FOREIGN KEY(preference_id) REFERENCES preferences(id),
    FOREIGN KEY(rol_id) REFERENCES roles(id),
	PRIMARY KEY(id)
);

CREATE TABLE categories (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    ranking INT UNIQUE NOT NULL,
	PRIMARY KEY(id)
);

CREATE TABLE products (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(150),
    price INT UNSIGNED NOT NULL,
	created_at TIMESTAMP DEFAULT NOW(),
    description VARCHAR(350),
    offer DECIMAL(3, 1) UNSIGNED DEFAULT NULL,    
    stock INT UNSIGNED NOT NULL,
    category_id INT UNSIGNED NOT NULL,
	FOREIGN KEY(category_id) REFERENCES categories(id),
	PRIMARY KEY(id)
);


CREATE TABLE colors (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(150) UNIQUE NOT NULL,
	PRIMARY KEY(id)
);

CREATE TABLE sizes (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(150) UNIQUE NOT NULL,
	PRIMARY KEY(id)
);

CREATE TABLE product_color (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    product_id INT UNSIGNED NOT NULL,
    color_id INT UNSIGNED NOT NULL,
	FOREIGN KEY(product_id) REFERENCES products(id),
	FOREIGN KEY(color_id) REFERENCES colors(id),
	PRIMARY KEY(id)
);

CREATE TABLE product_size (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    product_id INT UNSIGNED NOT NULL,
    size_id INT UNSIGNED NOT NULL,
	FOREIGN KEY(product_id) REFERENCES products(id),
	FOREIGN KEY(size_id) REFERENCES sizes(id),
	PRIMARY KEY(id)
);


CREATE TABLE images (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(300),
    product_id INT UNSIGNED NOT NULL,
    color_id INT UNSIGNED NOT NULL,
	FOREIGN KEY(product_id) REFERENCES products(id),
	FOREIGN KEY(color_id) REFERENCES colors(id),
	PRIMARY KEY(id)
);

CREATE TABLE user_product (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    quantity INT UNSIGNED,
    product_id INT UNSIGNED NOT NULL,
    user_id INT UNSIGNED NOT NULL,
	FOREIGN KEY(product_id) REFERENCES products(id),
	FOREIGN KEY(user_id) REFERENCES users(id),
	PRIMARY KEY(id)
);


