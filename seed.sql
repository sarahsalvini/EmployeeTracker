USE employee_DB;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
  ("Sarah", "Salvini", 5, 7),
  ("Jacob", "Edward", 6, 5),
  ("Joel", "Taylor", 7, Null), 
  ("Sam", "Salvini", 8, 7), 
  ("Bobby", "Hayes", 9, null),
  ("Lisa", "Brown", 10,  7), 
  ("Emma", "Smith", 11, Null), 
  ("Chris", "Johnson", 7, 6),
  ("John", "Clark", 9, 10);



INSERT INTO department (id, name)
VALUES 
(1, "Sales"),
(2, "Engineering"),
(3, "Finance"),
(4, "Legal");

   
INSERT INTO role (id, title, salary, department_id)
VALUES 
(5, "Sales Lead", 100000.00, 1),
(6, "Salesperson", 80000.00, 1),
(7, "Lead Engineer", 150000.00, 2),
(8, "Software Engineer", 120000.00, 2),
(9, "Accountant", 125000.00, 3),
(10, "Legal Team Lead", 250000.00, 4),
(11, "Lawyer", 190000.00, 4);
    
    
