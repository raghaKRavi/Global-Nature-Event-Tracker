import express from 'express';
import eonetRouter from './eonet/rest/routes/NaturalEventsRoute';
import bodyParser from 'body-parser';

const app = express()
const base_url = '/api/v1';

app.use(express.json())
app.use(`${base_url}/eonet`, eonetRouter);

app.listen(8080, () => { console.log("server started on port 8080")});

export default app;