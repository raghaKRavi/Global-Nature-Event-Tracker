import { Router } from "express";
import {
    getCategoriesDetail,
    getEvents,
    getGeoJsonEvents,
    getSources,
} from "../controller/NaturalEventsController";
import { validateDataMiddleware } from "../../../shared";
import { EventRequestSchema } from "../schemas/EventSchema";

const eonetRouter = Router();

/**
 * @swagger
 * /api/v1/eonet/categories:
 *   get:
 *     summary: Get available NASA API categories
 *     description: Fetch a list of available NASA API categories.
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
eonetRouter.get("/categories", getCategoriesDetail);

/**
* @swagger
* /api/v1/eonet/geojson:
*   get:
*     summary: Returns list of calamities category
*     parameters:
*     - name: status
*       in: query
*       description: The status filter (all, open, close)
*       required: false
*       schema:
*         type: string
*         enum: ["all", "open", "close"]
*     - name: limit
*       in: query
*       description: The limit for the number of results
*       required: false
*       schema:
*         type: string
*     - name: category
*       in: query
*       required: false
*       schema:
*         type: string
*     responses:
*       200:
*         components:
*/
eonetRouter.get(
    "/geojson",
    validateDataMiddleware(EventRequestSchema),
    getGeoJsonEvents
);

export default eonetRouter;
