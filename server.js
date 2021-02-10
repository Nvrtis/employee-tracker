const express = require('express');
const app = express()
const PORT = process.env.PORT || 8080
const runSearch = require("./public/assets/index")
// having local server to build it up in future


runSearch()


app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
})
