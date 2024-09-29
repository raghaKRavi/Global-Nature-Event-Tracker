"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRequestSchema = void 0;
const zod_1 = require("zod");
exports.EventRequestSchema = zod_1.z.object({
    status: zod_1.z.enum(["all", "open", "close"]),
    limit: zod_1.z.number().optional(),
    source: zod_1.z.string().optional(),
    category: zod_1.z.array(zod_1.z.string()).optional(),
    days: zod_1.z.number().optional(),
    start: zod_1.z.string().optional(),
    end: zod_1.z.string().optional(),
    minimumLong: zod_1.z.number().optional(),
    maximumLong: zod_1.z.number().optional(),
    minimumLat: zod_1.z.number().optional(),
    maximumLat: zod_1.z.number().optional(),
}).strict();
