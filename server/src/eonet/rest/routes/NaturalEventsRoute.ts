import { Router } from 'express';
import { getCategoriesDetail, getEvents, getGeoJsonEvents, getSources } from '../controller/NaturalEventsController';
import { validateDataMiddleware } from '../../../shared';
import { EventRequestSchema } from '../schemas/EventSchema';

const eonetRouter = Router();

/**
 * @swagger
 * /api/v1/eonet/categories:
 *   get:
 *     summary: Get available NASA API categories
 *     description: Fetch a list of available NASA API categories with their descriptions and API endpoints.
 *     responses:
 *       200:
 *         description: A list of NASA API categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "drought"
 *                   title:
 *                     type: string
 *                     example: "Drought"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid parameters"
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No categories found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch categories"
 */
eonetRouter.get('/categories', getCategoriesDetail);

/**
 * @swagger
 * /api/v1/eonet/events:
 *   get:
 *     summary: Returns list of calamities category
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hello, world!
 */
eonetRouter.get('/events', validateDataMiddleware(EventRequestSchema), getEvents);

/**
 * @swagger
 * /api/v1/eonet/sources:
 *   get:
 *     summary: Returns list of calamities category
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hello, world!
 */
eonetRouter.get('/sources', getSources);

/**
 * @swagger
 * /api/v1/eonet/geojson:
 *   get:
 *     summary: Returns list of calamities category
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hello, world!
 */
eonetRouter.get('/geojson', validateDataMiddleware(EventRequestSchema), getGeoJsonEvents);

export default eonetRouter;