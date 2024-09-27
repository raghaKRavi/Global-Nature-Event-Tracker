import express from 'express';
import eonet_routes from './eonet/rest/routes/NaturalEventsRoute';

const app = express()
const base_url = '/api/v1';

app.use(express.json())
app.use(`${base_url}/eonet`, eonet_routes);

app.listen(8080, () => { console.log("server started on port 8080")});