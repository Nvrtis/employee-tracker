const express = require('express');
const app = express()
const PORT = process.env.PORT || 8080
const runSearch = require('./public/index.js')

 
runSearch()

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})

