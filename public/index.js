const inquirer = require(`inquirer`)

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
        console.log(resp);
        switch (resp.employeeTracker) {
            case "View All Employees":
                connection.query()
                runSearch()
                break;
            case "View All Employees By Department":
                connection.query()
                runSearch()
                break;
            case "View All Employees By Manager":
                connection.query()
                runSearch()
                break;
            case "Add Employee":
                connection.query()
                runSearch()
                break;
            case "Remove Employee":
                connection.query()
                runSearch()
                break;
            case "Update Employee Role":
                connection.query()
                runSearch()
                break;
            case "Update Employee Manager":
                connection.query()
                runSearch()
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