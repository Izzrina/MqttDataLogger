-- Erstelle die Datenbank
CREATE DATABASE IF NOT EXISTS beebase;

-- Verwende die Datenbank
USE beebase;

CREATE TABLE IF NOT EXISTS measurements (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    dev_eui VARCHAR(16) COLLATE utf8mb4_general_ci NOT NULL,
    received_at DATETIME NOT NULL,
    degreesC DECIMAL(10,2) DEFAULT 0,
    humidity DECIMAL(10,2) DEFAULT 0,
    weight DECIMAL(10,2) DEFAULT 0,
    battery INT DEFAULT 0
);

-- Tabelle 'devices'
CREATE TABLE IF NOT EXISTS devices (
    dev_eui VARCHAR(16) PRIMARY KEY NOT NULL,
    device_id VARCHAR(25) UNIQUE NOT NULL,
    device_name VARCHAR(100) NOT NULL,
    password VARCHAR(50) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabelle 'users'
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    registered INTEGER NOT NULL DEFAULT 0
);

-- 'tokens'
CREATE TABLE IF NOT EXISTS tokens (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    owner INTEGER NOT NULL,
    token VARCHAR(255) NOT NULL,
    created DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 'registrations'
CREATE TABLE IF NOT EXISTS registrations (
    device_id VARCHAR(25) NOT NULL,
    user_id INTEGER NOT NULL,
    registration_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (device_id, user_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (device_id) REFERENCES devices(device_id)
);

-- Erstelle den Benutzer 'beewriter' und gewähre ihm Berechtigungen
CREATE USER IF NOT EXISTS 'beewriter'@'localhost' IDENTIFIED BY 'beeword';
GRANT INSERT ON beebase.measurements TO 'beewriter'@'localhost';
FLUSH PRIVILEGES;
