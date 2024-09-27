"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const NaturalEventsRoute_1 = __importDefault(require("./eonet/rest/routes/NaturalEventsRoute"));
const app = (0, express_1.default)();
const base_url = '/api/v1';
app.use(express_1.default.json());
app.use(`${base_url}/eonet`, NaturalEventsRoute_1.default);
app.listen(8080, () => { console.log("server started on port 8080"); });
