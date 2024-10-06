import express from 'express';
import eonetRouter from './eonet/rest/routes/NaturalEventsRoute';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import {swaggerSpec} from './swagger'

const app = express()
const base_url = '/api/v1';

app.use(cors());

app.options('*', cors());

app.use(express.json())
app.use(`${base_url}/eonet`, eonetRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(8080, () => { 
    console.log("server started on port 8080");
    console.log("Swagger docs available at http://localhost:8080/api-docs");
});

export default app;