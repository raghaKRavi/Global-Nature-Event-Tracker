import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NASA API Express App',
      version: '1.0.0',
      description: 'API documentation for NASA API access using Node.js and Express',
    },
    servers: [
      {
        url: 'http://localhost:8080', 
      },
    ],
  },
  apis: ['./src/eonet/rest/routes/NaturalEventsRoute.ts'], 
};

// Generate Swagger spec
export const swaggerSpec = swaggerJsdoc(swaggerOptions);