INSERT into department (name) VALUES ("SALES");
INSERT into department (name) VALUES ("IT");
INSERT into department (name) VALUES ("ENGINEERING");
INSERT into department (name) VALUES ("HR");

INSERT into role (title, salary, department_id) VALUES ("Sales Manager", 150, 1);
INSERT into role (title, salary, department_id) VALUES ("Sales person", 75, 1);
INSERT into role (title, salary, department_id) VALUES ("IT Manager", 100, 2);
INSERT into role (title, salary, department_id) VALUES ("Engineer", 90, 2);
INSERT into role (title, salary, department_id) VALUES ("Counselor", 80, 4);

INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Bob", "Larry", 1, 0);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Joe", "Garfield", 2, 1);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Katie", "Becket", 2, 1);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Larry", "Bob", 3, 0);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Angus", "MacGyver", 4, 3);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Sam", "Sam", 4, 3);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Holly", "Bob", 4, 3);
