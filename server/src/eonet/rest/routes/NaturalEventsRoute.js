const express = require('express');
const router = express.Router();

const { getCategoriesDetail } = require('../controller/NaturalEventsController')

router.get('/categories', getCategoriesDetail);

module.exports = router;