const express = require('express');
const app = express()

app.get("/api", (request, response) => {
    response.json({"Hello": "world"})
});

app.listen(8080, () => { console.log("server started on port 8080")});