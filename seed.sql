USE ep_track

INSERT INTO department (name) VALUES ("Management Committee");
INSERT INTO department (name) VALUES ("Front Office");
INSERT INTO department (name) VALUES ("Operations");
INSERT INTO role (title, salary, department_id) VALUES ("CFO", 670000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("CEO", 1670000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Analyst - Trader", 145000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Desk Lead", 210000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Analyst - Controller", 90000, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Associate - Compliance", 120000, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Gorman", "James", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Pruzan", "Jon", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Jones", "Mike", 3, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Baby", "Da", 4, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Mane", "Gucci", 5, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Smoke", "Pop", 6, 3);