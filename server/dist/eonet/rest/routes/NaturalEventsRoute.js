"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const NaturalEventsController_1 = require("../controller/NaturalEventsController");
const shared_1 = require("../../../shared");
const EventSchema_1 = require("../schemas/EventSchema");
const eonetRouter = (0, express_1.Router)();
eonetRouter.get('/categories', NaturalEventsController_1.getCategoriesDetail);
eonetRouter.get('/events', (0, shared_1.validateDataMiddleware)(EventSchema_1.EventRequestSchema), NaturalEventsController_1.getEvents);
exports.default = eonetRouter;
