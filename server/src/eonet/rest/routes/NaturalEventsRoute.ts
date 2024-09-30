import { Router } from 'express';
import { getCategoriesDetail, getEvents, getGeoJsonEvents, getSources } from '../controller/NaturalEventsController';
import { validateDataMiddleware } from '../../../shared';
import { EventRequestSchema } from '../schemas/EventSchema';

const eonetRouter = Router();

eonetRouter.get('/categories', getCategoriesDetail);
eonetRouter.get('/events', validateDataMiddleware(EventRequestSchema), getEvents);
eonetRouter.get('/geojson', validateDataMiddleware(EventRequestSchema), getGeoJsonEvents);
eonetRouter.get('/sources', getSources);

export default eonetRouter;