import { z } from 'zod';

export const EventRequestSchema = z.object({
    status: z.enum(["all", "open", "close"]),
    limit: z.string().optional(),
    source: z.string().optional(),
    category: z.array(z.string()).optional(),
    days: z.number().optional(),
    start: z.string().optional(),
    end: z.string().optional(),
    minimumLong: z.number().optional(),
    maximumLong: z.number().optional(),
    minimumLat: z.number().optional(),
    maximumLat: z.number().optional(),
}).strict();