"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const NaturalEventsController_1 = require("../controller/NaturalEventsController");
const router = (0, express_1.Router)();
router.get('/categories', NaturalEventsController_1.getCategoriesDetail);
router.get('/events', NaturalEventsController_1.getEvents);
exports.default = router;
