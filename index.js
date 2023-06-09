const {
  getAllDepartments,
  getAllRoles,
  getAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
  closeConnection,
} = require("./db");

async function startApplication() {
  const { default: inquirer } = await import("inquirer");
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "Exit",
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case "View all departments":
          getAllDepartments()
            .then((departments) => {
              console.table(departments);
              startApplication();
            })
            .catch((err) => {
              console.log("Error occurred while fetching departments:", err);
              startApplication();
            });
          break;

        case "View all roles":
          getAllRoles()
            .then((roles) => {
              console.table(roles);
              startApplication();
            })
            .catch((err) => {
              console.log("Error occurred while fetching roles:", err);
              startApplication();
            });
          break;

        case "View all employees":
          getAllEmployees()
            .then((employees) => {
              console.table(employees);
              startApplication();
            })
            .catch((err) => {
              console.log("Error occurred while fetching employees:", err);
              startApplication();
            });
          break;

        case "Add a department":
          inquirer
            .prompt([
              {
                name: "name",
                type: "input",
                message: "Enter the name of the department:",
                validate: (input) => {
                  if (input.trim() === "") {
                    return "Department name cannot be empty.";
                  }
                  return true;
                },
              },
            ])
            .then((departmentData) => {
              addDepartment(departmentData.name)
                .then(() => {
                  console.log("Department added successfully!");
                  startApplication();
                })
                .catch((err) => {
                  console.log("Error occurred while adding department:", err);
                  startApplication();
                });
            });
          break;

        case "Add a role":
          getAllDepartments()
            .then((departments) => {
              const departmentChoices = departments.map((department) => ({
                name: department.name,
                value: department.id,
              }));

              inquirer
                .prompt([
                  {
                    name: "title",
                    type: "input",
                    message: "Enter the title of the role:",
                    validate: (input) => {
                      if (input.trim() === "") {
                        return "Role title cannot be empty.";
                      }
                      return true;
                    },
                  },
                  {
                    name: "salary",
                    type: "number",
                    message: "Enter the salary for the role:",
                    validate: (input) => {
                      if (input.trim() === "" || isNaN(input)) {
                        return "Please enter a valid salary.";
                      }
                      return true;
                    },
                  },
                  {
                    name: "departmentId",
                    type: "list",
                    message: "Select the department for the role:",
                    choices: departmentChoices,
                  },
                ])
                .then((roleData) => {
                  addRole(
                    roleData.title,
                    roleData.salary,
                    roleData.departmentId
                  )
                    .then(() => {
                      console.log("Role added successfully!");
                      startApplication();
                    })
                    .catch((err) => {
                      console.log("Error occurred while adding role:", err);
                      startApplication();
                    });
                });
            })
            .catch((err) => {
              console.log("Error occurred while fetching departments:", err);
              startApplication();
            });
          break;

        case "Add an employee":
          getAllRoles()
            .then((roles) => {
              const roleChoices = roles.map((role) => ({
                name: role.title,
                value: role.id,
              }));

              getAllEmployees()
                .then((employees) => {
                  const managerChoices = employees.map((employee) => ({
                    name: `${employee.first_name} ${employee.last_name}`,
                    value: employee.id,
                  }));

                  managerChoices.push({ name: "None", value: null });

                  inquirer
                    .prompt([
                      {
                        name: "firstName",
                        type: "input",
                        message: "Enter the first name of the employee:",
                        validate: (input) => {
                          if (input.trim() === "") {
                            return "First name cannot be empty.";
                          }
                          return true;
                        },
                      },
                      {
                        name: "lastName",
                        type: "input",
                        message: "Enter the last name of the employee:",
                        validate: (input) => {
                          if (input.trim() === "") {
                            return "Last name cannot be empty.";
                          }
                          return true;
                        },
                      },
                      {
                        name: "roleId",
                        type: "list",
                        message: "Select the role for the employee:",
                        choices: roleChoices,
                      },
                      {
                        name: "managerId",
                        type: "list",
                        message: "Select the manager for the employee:",
                        choices: managerChoices,
                      },
                    ])
                    .then((employeeData) => {
                      addEmployee(
                        employeeData.firstName,
                        employeeData.lastName,
                        employeeData.roleId,
                        employeeData.managerId
                      )
                        .then(() => {
                          console.log("Employee added successfully!");
                          startApplication();
                        })
                        .catch((err) => {
                          console.log(
                            "Error occurred while adding employee:",
                            err
                          );
                          startApplication();
                        });
                    });
                })
                .catch((err) => {
                  console.log("Error occurred while fetching employees:", err);
                  startApplication();
                });
            })
            .catch((err) => {
              console.log("Error occurred while fetching roles:", err);
              startApplication();
            });
          break;

        case "Update an employee role":
          getAllEmployees()
            .then((employees) => {
              const employeeChoices = employees.map((employee) => ({
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id,
              }));

              getAllRoles()
                .then((roles) => {
                  const roleChoices = roles.map((role) => ({
                    name: role.title,
                    value: role.id,
                  }));

                  inquirer
                    .prompt([
                      {
                        name: "employeeId",
                        type: "list",
                        message: "Select the employee to update:",
                        choices: employeeChoices,
                      },
                      {
                        name: "roleId",
                        type: "list",
                        message: "Select the new role for the employee:",
                        choices: roleChoices,
                      },
                    ])
                    .then((updateData) => {
                      updateEmployeeRole(
                        updateData.employeeId,
                        updateData.roleId
                      )
                        .then(() => {
                          console.log("Employee role updated successfully!");
                          startApplication();
                        })
                        .catch((err) => {
                          console.log(
                            "Error occurred while updating employee role:",
                            err
                          );
                          startApplication();
                        });
                    });
                })
                .catch((err) => {
                  console.log("Error occurred while fetching roles:", err);
                  startApplication();
                });
            })
            .catch((err) => {
              console.log("Error occurred while fetching employees:", err);
              startApplication();
            });
          break;

        case "Exit":
          console.log("Exiting the application.");
          closeConnection();
          process.exit();

        default:
          console.log("Invalid choice. Please try again.");
          startApplication();
      }
    });
}

startApplication();
