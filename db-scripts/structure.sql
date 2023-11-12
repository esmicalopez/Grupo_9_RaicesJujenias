DROP DATABASE IF EXISTS raices_jujenias;

CREATE DATABASE raices_jujenias;

use raices_jujenias;

--
-- Table structure for table `preferences`
--

CREATE TABLE preferences (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
	PRIMARY KEY(id)
);

--
-- Table structure for table `roles`
--

CREATE TABLE roles (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
	PRIMARY KEY(id)
);

--
-- Table structure for table `users`
--

CREATE TABLE users (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    last_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(400) NOT NULL,
    avatar VARCHAR(400) DEFAULT 'defaultAvatar.png',
    preference_id INT UNSIGNED NOT NULL, 
    rol_id INT UNSIGNED NOT NULL,
    register_date datetime NOT NULL,
    updated_at datetime NOT NULL,
    deleted_at datetime DEFAULT NULL,
    FOREIGN KEY(preference_id) REFERENCES preferences(id),
    FOREIGN KEY(rol_id) REFERENCES roles(id),
	PRIMARY KEY(id)
);

--
-- Table structure for table `categories`
--

CREATE TABLE categories (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    ranking INT UNIQUE NOT NULL,
	PRIMARY KEY(id)
);

--
-- Table structure for table `products`
--

CREATE TABLE products (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(150),
    description VARCHAR(350),
    category_id INT UNSIGNED NOT NULL,
	created_at datetime NOT NULL,
    updated_at datetime NOT NULL,
    deleted_at datetime DEFAULT NULL,
	FOREIGN KEY(category_id) REFERENCES categories(id),
	PRIMARY KEY(id)
);

--
-- Table structure for table `colors`
--

CREATE TABLE colors (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(150) UNIQUE NOT NULL,
	PRIMARY KEY(id)
);

--
-- Table structure for table `sizes`
--

CREATE TABLE sizes (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(150) UNIQUE NOT NULL,
	PRIMARY KEY(id)
);

--
-- Table structure for table `product_detail`
--

CREATE TABLE product_detail (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    price INT UNSIGNED NOT NULL,
    offer DECIMAL(3, 1) UNSIGNED DEFAULT NULL,    
    stock INT UNSIGNED NOT NULL,
    product_id INT UNSIGNED NOT NULL,
    color_id INT UNSIGNED NOT NULL,
    size_id INT UNSIGNED NOT NULL,
	FOREIGN KEY(product_id) REFERENCES products(id),
	FOREIGN KEY(color_id) REFERENCES colors(id),
    FOREIGN KEY(size_id) REFERENCES sizes(id),
	PRIMARY KEY(id)
);

--
-- Table structure for table `images`
--

CREATE TABLE images (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(300),
    product_detail_id INT UNSIGNED NOT NULL,
	FOREIGN KEY(product_detail_id) REFERENCES product_detail(id),
	PRIMARY KEY(id)
);

--
-- Table structure for table `user_product`
--

CREATE TABLE user_product (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    product_id INT UNSIGNED NOT NULL,
    user_id INT UNSIGNED NOT NULL,
	FOREIGN KEY(product_id) REFERENCES products(id),
	FOREIGN KEY(user_id) REFERENCES users(id),
	PRIMARY KEY(id)
);


