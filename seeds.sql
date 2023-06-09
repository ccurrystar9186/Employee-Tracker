-- Insert sample data into the department table
INSERT INTO department (name) VALUES
  ('Sales'),
  ('Engineering'),
  ('Finance'),
  ('Human Resources');

-- Insert sample data into the role table
INSERT INTO role (title, salary, department_id) VALUES
  ('Sales Manager', 80000.00, 1),
  ('Sales Associate', 50000.00, 1),
  ('Software Engineer', 90000.00, 2),
  ('Accountant', 60000.00, 3),
  ('HR Manager', 70000.00, 4);

-- Insert sample data into the employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Smith', 2, 1),
  ('Mike', 'Johnson', 3, 1),
  ('Emily', 'Davis', 4, NULL),
  ('Alex', 'Wilson', 5, 4);
