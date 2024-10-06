import express from 'express';
import eonetRouter from './eonet/rest/routes/NaturalEventsRoute';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import {swaggerSpec} from './swagger'

const app = express()
const base_url = '/api/v1';

app.use(cors({
    origin: 'http://localhost:3000', // Your frontend URL
    // methods: 'GET,POST,PUT,DELETE', // Specify allowed methods if needed
    // allowedHeaders: 'Content-Type,Authorization', // Specify allowed headers if needed
}));
app.use(express.json())
app.use(`${base_url}/eonet`, eonetRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(8080, () => { 
    console.log("server started on port 8080");
    console.log("Swagger docs available at http://localhost:8080/api-docs");
});

export default app;