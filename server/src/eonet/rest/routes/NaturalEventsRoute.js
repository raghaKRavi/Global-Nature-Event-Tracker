const express = require('express');
const router = express.Router();

const { getCategoriesDetail, getEvents } = require('../controller/NaturalEventsController')

router.get('/categories', getCategoriesDetail);
router.get('/events', getEvents);

module.exports = router;