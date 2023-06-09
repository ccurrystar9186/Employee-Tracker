const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "admin",
  database: "employee_db",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the employee database.");
});

function getAllDepartments() {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM department", (err, departments) => {
      if (err) {
        reject(err);
      } else {
        resolve(departments);
      }
    });
  });
}

function getAllRoles() {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM role", (err, roles) => {
      if (err) {
        reject(err);
      } else {
        resolve(roles);
      }
    });
  });
}

function getAllEmployees() {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM employee", (err, employees) => {
      if (err) {
        reject(err);
      } else {
        resolve(employees);
      }
    });
  });
}

function addDepartment(name) {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO department (name) VALUES (?)",
      [name],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}

function addRole(title, salary, departmentId) {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
      [title, salary, departmentId],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}

function addEmployee(firstName, lastName, roleId, managerId) {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
      [firstName, lastName, roleId, managerId],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}

function updateEmployeeRole(employeeId, roleId) {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE employee SET role_id = ? WHERE id = ?",
      [roleId, employeeId],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}

function closeConnection() {
  return new Promise((resolve, reject) => {
    try {
      connection.end();
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  getAllDepartments,
  getAllRoles,
  getAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
  closeConnection,
};
