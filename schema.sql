DROP DATABASE IF EXISTS ep_track;

CREATE DATABASE ep_track;

USE ep_track;

CREATE TABLE department (
	id INT AUTO_INCREMENT,
    name VARCHAR(40) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE role (
	id INT auto_increment,
    title VARCHAR(40) NOT NULL,
    salary INT(10) NOT NULL,
    department_id INT NOT NULL,
    primary key(id)
);

CREATE TABLE employee (
id INT auto_increment, 
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT, 
manager_id INT NULL,
primary key(id)
);