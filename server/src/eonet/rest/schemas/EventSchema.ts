import { z } from 'zod';

export const EventRequestSchema = z.object({
    status: z.enum(["all", "open", "close"]),
    limit: z.string().optional(),
    source: z.string().optional(),
    category: z.string().optional(),
    days: z.string().optional(),
    start: z.string().optional(),
    end: z.string().optional(),
    minimumLong: z.string().optional(),
    maximumLong: z.string().optional(),
    minimumLat: z.string().optional(),
    maximumLat: z.string().optional(),
}).strict();