"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSources = exports.getEvents = exports.getCategoriesDetail = void 0;
const NaturalEventsService_1 = __importDefault(require("../../domain/service/NaturalEventsService"));
require('dotenv').config();
const NaturalEventsServiceInstance = new NaturalEventsService_1.default(process.env.NASA_API_EONET_BASE);
const getCategoriesDetail = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield NaturalEventsServiceInstance.getCategories();
        response.json(data);
    }
    catch (error) {
        response.status(500).json({ message: 'Error fetching data' });
    }
});
exports.getCategoriesDetail = getCategoriesDetail;
const getEvents = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield NaturalEventsServiceInstance.getEvents(request.body);
        response.json(data);
    }
    catch (error) {
        response.status(500).json({ message: 'Error fetching data' });
    }
});
exports.getEvents = getEvents;
const getSources = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield NaturalEventsServiceInstance.getSources();
        response.json(data);
    }
    catch (error) {
        response.status(500).json({ message: 'Error fetching data' });
    }
});
exports.getSources = getSources;
exports.default = {
    getCategoriesDetail: exports.getCategoriesDetail,
    getEvents: exports.getEvents,
    getSources: exports.getSources
};
