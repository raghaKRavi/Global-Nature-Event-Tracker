import { Router } from 'express';
import { getCategoriesDetail, getEvents } from '../controller/NaturalEventsController';

const router = Router();

router.get('/categories', getCategoriesDetail);
router.get('/events', getEvents);

export default router;