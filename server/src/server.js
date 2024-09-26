const express = require('express');
const app = express()
const eonet_routes = require('./eonet/rest/routes/NaturalEventsRoute');
const base_url = '/api/v1';

app.use(express.json())
app.use(`${base_url}/eonet`, eonet_routes);

app.listen(8080, () => { console.log("server started on port 8080")});