import { z } from 'zod';

export const createQuizSchema = z.object({
  topic: z.string().min(3, { message: 'Topic must be at least 3 characters long' }),
  type: z.enum([ 'mcq', 'open_ended', ]),
  amount: z.number().max(10).min(1),
});