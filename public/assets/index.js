const inquirer = require(`inquirer`)
const mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'employee_tracker'
});

// Main questions for user
const question = [
    {
        name: "employeeTracker",
        type: "list",
        message: "What would you like to do",
        choices: ["View All Employees", "View All Employees By Department", "View All Employees By Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager", "View All Roles", "Add Role", "Remove Role", "View All Departments", "Add Department", "Remove Department", "Quit"]
    }
]

// function for asking users
const runSearch = () => {
    inquirer
        .prompt(question)
        .then((resp) => {
            // switch statment 
            switch (resp.employeeTracker) {
                // view all employees and all data
                case "View All Employees":
                    connection.query("SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, role.title, employee.manager_id, role.salary, role.department_id, department.name FROM employee LEFT JOIN role ON role.id=employee.role_id LEFT Join department ON department.id=role.department_id;", (err, result) => {
                        if (err) throw err
                        console.table(result)
                        runSearch()
                    }).catch(err => {
                        console.error(err)
                    })
                    break;
                // View employees by department and shows relevent data
                case "View All Employees By Department":
                    connection.query('SELECT department.name AS department, role.department_id, employee.first_name, employee.last_name, role.title FROM role  LEFT JOIN employee on employee.role_id = role.id  LEFT OUTER JOIN department on department.id=role.department_id ORDER BY department.name', (err, result) => {
                        if (err) throw err
                        console.table(result);
                        runSearch()
                    }).catch(err => {
                        console.error(err)
                    })

                    break;
                // View employees by managers and shows relevent data
                case "View All Employees By Manager":
                    connection.query(`SELECT e.*, CONCAT (m.first_name, ' ', m.last_name) AS manager FROM employee AS e LEFT JOIN employee AS m ON e.manager_id = m.id ORDER BY e.manager_id;`, (err, result) => {
                        if (err) throw err
                        console.table(result);
                        runSearch()
                    }).catch(err => {
                        console.error(err)
                    })
                    break;
                // adds employee by series of inquierer questions
                case "Add Employee":
                    connection.query(`SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, role.title, employee.manager_id, role.salary, role.department_id, department.name FROM employee LEFT JOIN role ON role.id=employee.role_id LEFT Join department ON department.id=role.department_id;`, (err, result) => {
                        if (err) throw err
                        console.table(result);
                        inquirer.prompt([{
                            name: "firstName",
                            type: "input",
                            message: "Please enter the employee's first name"
                        }, {
                            name: "lastName",
                            type: "input",
                            message: "Please enter the employee's last name"
                        }, {
                            name: "roleID",
                            type: "input",
                            message: "Please choose the employee's role",
                        }, {
                            name: "managerID",
                            type: "input",
                            message: "Please choose the employee's manager, please enter 0 if user have no manager"
                        }]).then(answer => {
                            connection.query(`INSERT INTO employee (employee.first_name, employee.last_name, employee.role_id, employee.manager_id) VALUES (?, ?, ?, ?);`, [[answer.firstName], [answer.lastName], [answer.roleID], [answer.managerID]], (err, result2) => {
                                if (err) throw err
                                console.log(`${answer.firstName} ${answer.lastName} has been entered into the database`)
                                runSearch()
                            })
                        })
                    }).catch(err => {
                        console.error(err)
                    })
                    break;
                // remove employee by id
                case "Remove Employee":
                    connection.query(`SELECT * FROM employee `, (err, result) => {
                        if (err) throw err
                        console.table(result);
                        inquirer.prompt([{
                            name: "deleteID",
                            type: "input",
                            message: "Please enter the employee id you would like to delete"
                        }, {
                            name: "areYouSure",
                            type: "confirm",
                            message: "Are you sure that you would like to delete this user?"
                        }]).then(answer => {
                            if (answer.areYouSure) {
                                connection.query(`DELETE FROM employee WHERE id=?`, [answer.deleteID], (err, result) => {
                                    if (err) throw err
                                    console.log(`User with employee id:${answer.deleteID} has been deleted`);
                                    runSearch()
                                })
                            }
                            else {
                                runSearch()
                            }
                        })
                    }).catch(err => {
                        console.error(err)
                    })
                    break;
                // update employees role by id
                case "Update Employee Role":
                    connection.query(`SELECT * FROM employee `, (err, result) => {
                        if (err) throw err
                        console.table(result);
                        inquirer.prompt([{
                            name: "userID",
                            type: "input",
                            message: "Please enter the employee id you would like to change"
                        }, {
                            name: "roleID",
                            type: "input",
                            message: "Please enter the new role id for the employee"
                        }, {
                            name: "areYouVerySure",
                            type: "confirm",
                            message: "Are you sure that you would like to change this user?"
                        }]).then(answer => {
                            if (answer.areYouVerySure) {
                                connection.query(`UPDATE employee SET role_id = ? WHERE id = ?;`, [[answer.roleID], [answer.userID]], (err, result) => {
                                    if (err) throw err
                                    console.log(`User with employee id:${answer.userID} has been reassigned a new role`);
                                    runSearch()
                                })
                            }
                            else {
                                runSearch()
                            }
                        })
                    }).catch(err => {
                        console.error(err)
                    })
                    break;
                // update employees manager by manager id
                case "Update Employee Manager":

                    connection.query(`SELECT * FROM employee `, (err, result) => {
                        if (err) throw err
                        console.table(result);
                        inquirer.prompt([{
                            name: "userID",
                            type: "input",
                            message: "Please enter the employee id you would like to change the manager for"
                        }, {
                            name: "managerID",
                            type: "input",
                            message: "Please enter the new manager id (in you want to remove users manager write 0)"
                        }, {
                            name: "areYouVerySure",
                            type: "confirm",
                            message: "Are you sure that you would like to change this user?"
                        }]).then(answer => {
                            if (answer.areYouVerySure) {
                                connection.query(`UPDATE employee SET manager_id = ? WHERE id = ?;`, [[answer.managerID], [answer.userID]], (err, result) => {
                                    if (err) throw err
                                    console.log(`User with employee id:${answer.userID} has been reassigned a new manager`);
                                    runSearch()
                                })
                            }
                            else {
                                runSearch()
                            }
                        })
                    }).catch(err => {
                        console.error(err)
                    })
                    break;
                // view all roles
                case "View All Roles":
                    connection.query("SELECT * FROM role", (err, result) => {
                        if (err) throw err
                        console.table(result)
                        runSearch()
                    }).catch(err => {
                        console.error(err)
                    })
                    break;
                // adds role by series of inquierer questions
                case "Add Role":
                    connection.query(`SELECT * FROM role;`, (err, result) => {
                        if (err) throw err
                        console.table(result);
                        inquirer.prompt([{
                            name: "title",
                            type: "input",
                            message: "Please enter role title"
                        }, {
                            name: "salary",
                            type: "input",
                            message: "Please employees salary (in thousands)"
                        }, {
                            name: "department",
                            type: "input",
                            message: "Please department ID",
                        }]).then(answer => {
                            connection.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);`, [[answer.title], [answer.salary], [answer.department]], (err, result2) => {
                                if (err) throw err
                                console.log(`${answer.title} has been added in Department id: ${answer.department} with a salary of ${answer.salary}.000`)
                                runSearch()
                            })
                        })
                    }).catch(err => {
                        console.error(err)
                    })
                    break;
                // remove role by id
                case "Remove Role":
                    connection.query(`SELECT * FROM role `, (err, result) => {
                        if (err) throw err
                        console.table(result);
                        inquirer.prompt([{
                            name: "deleteRoleID",
                            type: "input",
                            message: "Please enter the role id you would like to delete"
                        }, {
                            name: "areYouSure",
                            type: "confirm",
                            message: "Are you sure that you would like to delete this role?"
                        }]).then(answer => {
                            if (answer.areYouSure) {
                                connection.query(`DELETE FROM role WHERE id=?`, [answer.deleteRoleID], (err, result) => {
                                    if (err) throw err
                                    console.log(`role id:${answer.deleteID} has been deleted`);
                                    runSearch()
                                })
                            }
                            else {
                                runSearch()
                            }
                        })
                    }).catch(err => {
                        console.error(err)
                    })
                    break;
                // shows all departments and departments ids
                case "View All Departments":
                    connection.query(`SELECT * FROM department `, (err, result) => {
                        if (err) throw err
                        console.table(result)
                        runSearch()
                    }).catch(err => {
                        console.error(err)
                    })
                    break;
                // adds a new Department, needs only name for department
                case "Add Department":
                    connection.query(`SELECT * FROM department `, (err, result) => {
                        if (err) throw err
                        console.table(result)
                        inquirer.prompt({
                            name: "departmentName",
                            type: "input",
                            message: "Please enter the department name (please enter with all caps)",
                        }).then(answer => {
                            connection.query(`INSERT INTO department (name) VALUES (?) `, [answer.departmentName], (err, result) => {
                                if (err) throw err
                                console.log(`Department ${answer.departmentName} has been added`);

                                runSearch()

                            })
                        }).catch(err => {
                            console.error(err)
                        })
                    })
                    break;
                // removes department by id
                case "Remove Department":
                    connection.query(`SELECT * FROM department `, (err, result) => {
                        if (err) throw err
                        console.table(result);
                        inquirer.prompt([{
                            name: "deleteDepartmentID",
                            type: "input",
                            message: "Please enter the department id you would like to delete"
                        }, {
                            name: "areYouSure",
                            type: "confirm",
                            message: "Are you sure that you would like to delete this department?"
                        }]).then(answer => {
                            if (answer.areYouSure) {
                                connection.query(`DELETE FROM department WHERE id=?`, [answer.deleteDepartmentID], (err, result) => {
                                    if (err) throw err
                                    console.log(`Department id:${answer.deleteDepartmentID} has been deleted`);
                                    runSearch()
                                })
                            }
                            else {
                                runSearch()
                            }
                        }).catch(err => {
                            console.error(err)
                        })
                    })
                    break;
                // exit 
                case "Quit":
                    process.exit();
                    break;
            }
        })
}


module.exports = runSearch