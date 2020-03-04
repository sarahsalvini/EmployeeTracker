USE employee_DB;

INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES   
  ("Sarah", "Salvini", 1, NULL),
  ("Jacob", "Edward", 2, 4),
  ("Joel", "Taylor", 3, 2), 
  ("Sam", "Salvini", 4, Null), 
  ("Bobby", "Hayes", 5, 4),
  ("Lisa", "Brown", 6,  Null), 
  ("Emma", "Smith", 7, Null), 
  ("Chris", "Johnson", 8, 7),
  ("John", "Clark", 9, 3);

  INSERT INTO department (name) 
  VALUES ("Sales"),
         ("Engineering"),
         ("Customer Service");

   
INSERT INTO role (title, salary)
VALUES ("Sales Lead", 90000, 1), 
        ("Salesperson", 60000, 1),
        ("Senior Engineer", 150000, 2),
        ("Software Engineer", 80000, 2),
        ("Receptionist", 30000, 3),
        ("Customer Service Agent", 35000, 3); 
    
    