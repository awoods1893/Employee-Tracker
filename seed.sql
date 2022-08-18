USE employees_db;
INSERT INTO department (name)
VALUES 
('Information Security'),
('Information Technology'),
('Research and Development'),
('Human Resources'),
('Business Operations'),
('Manufacturing');

INSERT INTO role (title, salary, department_id)
VALUES
('Security Engineer', 90000, 1),
('Helpdesk Analyst', 70000, 2),
('R&D Scientist', 50000, 3),
('HR Representative', 70000, 4),
('Business Operations Analyst', 90000, 5),
('Manufacturing Operator', 40000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Thomas', 'Anderson', 1, 458),
('Tiffany', 'Anderson', 2, 276),
('Steven', 'Smith', 3, 486),
('Mor', 'Pheus', 4, 126),
('Jim', 'Halpert', 5, 724),
('Pam', 'Beasley', 6, 157);