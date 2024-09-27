import { Router } from 'express';
import { getCategoriesDetail, getEvents } from '../controller/NaturalEventsController';
import { validateDataMiddleware } from '../../../shared';
import { EventRequestSchema } from '../schemas/EventSchema';

const eonetRouter = Router();

eonetRouter.get('/categories', getCategoriesDetail);
eonetRouter.get('/events', validateDataMiddleware(EventRequestSchema), getEvents);

export default eonetRouter;