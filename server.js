const http = require('http')
const express = require('express');
const app = express()
const PORT = process.env.PORT || 8080
const mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'employee_tracker'
});
 
// connection.connect();
 
// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });
 
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
