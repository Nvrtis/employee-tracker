const inquirer = require(`inquirer`)
const mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'employee_tracker'
});


const question = [
    {
        name: "employeeTracker",
        type: "list",
        message: "What would you like to do",
        choices: ["View All Employees", "View All Employees By Department", "View All Employees By Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager", "Add Role", "Remove Role", "View All Departments", "Add Department", "Remove Department", "Quit"]
    }
]

const runSearch = () => {
    inquirer
        .prompt(question)
        .then((resp) => {

            switch (resp.employeeTracker) {
                case "View All Employees":
                    connection.query("SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, role.title, employee.manager_id, role.salary, role.department_id, department.name FROM employee LEFT JOIN role ON role.id=employee.role_id LEFT Join department ON department.id=role.department_id;", (err, result) => {
                        if (err) throw err
                        console.table(result)
                        runSearch()
                    })
                    break;

                case "View All Employees By Department":
                    connection.query('SELECT department.name AS department, role.department_id, employee.first_name, employee.last_name, role.title FROM role  LEFT JOIN employee on employee.role_id = role.id  LEFT OUTER JOIN department on department.id=role.department_id ORDER BY department.name', (err, result) => {
                        if (err) throw err
                        console.table(result);
                        runSearch()
                    })

                    break;

                case "View All Employees By Manager":
                    connection.query(`SELECT e.*, CONCAT (m.first_name, ' ', m.last_name) AS manager FROM employee AS e LEFT JOIN employee AS m ON e.manager_id = m.id;`, (err, result) => {
                        if (err) throw err
                        console.table(result);
                        runSearch()
                    })
                    break;

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
                            type:"input",
                            message: "Please choose the employee's manager, please enter 0 if user have no manager"
                        }]).then(answer => {
                            connection.query(`INSERT INTO employee (employee.first_name, employee.last_name, employee.role_id, employee.manager_id) VALUES (?, ?, ?, ?);`,[[answer.firstName],[answer.lastName],[answer.roleID],[answer.managerID]], (err, result2) => {
                                if (err) throw err
                                console.log(`${answer.firstName} ${answer.lastName} has been entered into the database`)
                            runSearch()
                        })
                    })
                })
                    break;

                case "Remove Employee":
                    connection.query(`SELECT * FROM employee `, (err, result) => {
                        if (err) throw err
                        console.table(result);
                        inquirer.prompt([{
                            name: "deleteID",
                            type:"input",
                            message: "Please enter the employee id you would like to delete"
                        },{
                            name: "areYouSure",
                            type:"confirm",
                            message: "Are you sure that you would like to delete this user?"
                        }]).then(answer => {
                            if(answer.areYouSure) {
                            connection.query(`DELETE FROM employee WHERE id=?`,[answer.deleteID], (err, result) => {
                                if (err) throw err
                                console.log(`User with employee id:${answer.deleteID} has been deleted`);
                                runSearch()
                            })}
                            else {
                                runSearch()
                            }
                        })
                    })
                    break;

                case "Update Employee Role":
                    connection.query(`SELECT * FROM employee `, (err, result) => {
                        if (err) throw err
                        console.table(result);
                        inquirer.prompt([{
                            name: "userID",
                            type:"input",
                            message: "Please enter the employee id you would like to change"
                        },{
                            name: "roleID",
                            type:"input",
                            message: "Please enter the new role id for the employee"
                        },{
                            name: "areYouVerySure",
                            type:"confirm",
                            message: "Are you sure that you would like to change this user?"
                        }]).then(answer => {
                            if(answer.areYouVerySure) {
                            connection.query(`UPDATE employee SET role_id = ? WHERE id = ?;`,[[answer.roleID],[answer.userID]], (err, result) => {
                                if (err) throw err
                                console.log(`User with employee id:${answer.userID} has been reassigned a new role`);
                                runSearch()
                            })}
                            else {
                                runSearch()
                            }
                        })
                    })
                    break;

                case "Update Employee Manager":
                    connection.query(`SELECT * FROM employee `, (err, result) => {
                        if (err) throw err
                        console.table(result);
                        inquirer.prompt([{
                            name: "userID",
                            type:"input",
                            message: "Please enter the employee id you would like to change the manager for"
                        },{
                            name: "managerID",
                            type:"input",
                            message: "Please enter the new manager id"
                        },{
                            name: "areYouVerySure",
                            type:"confirm",
                            message: "Are you sure that you would like to change this user?"
                        }]).then(answer => {
                            if(answer.areYouVerySure) {
                            connection.query(`UPDATE employee SET manager_id = ? WHERE id = ?;`,[[answer.managerID],[answer.userID]], (err, result) => {
                                if (err) throw err
                                console.log(`User with employee id:${answer.userID} has been reassigned a new manager`);
                                runSearch()
                            })}
                            else {
                                runSearch()
                            }
                        })
                    })
                    break;

                case "Add Role":
                    connection.query()
                    runSearch()
                    break;

                case "Remove Role":
                    connection.query()
                    runSearch()
                    break;

                case "View All Departments":
                    connection.query()
                    runSearch()
                    break;

                case "Add Department":
                    connection.query()
                    runSearch()
                    break;

                case "Remove Department":
                    connection.query()
                    runSearch()
                    break;

                case "Quit":
                    process.exit();
                    break;
            }
        })
}

module.exports = runSearch()



// const departments = []
// for (var i = 0; i < result.length; i++) {
//     departments.push(result[i].name)
// }
// // console.log(departments);
// inquirer.prompt({
//     name: "whichDepartment",
//     type: "list",
//     message: "Which Department would you like to search for?",
//     choices: departments
// }
// ).then((resp) => {
//     connection.query('SELECT * FROM department;',(err, result)=> {
//         if(err) throw err