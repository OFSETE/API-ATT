const { z } = require('zod');

const bookSchema = z.object({
  title: z.string().min(1, 'title required'),
  author: z.string().min(1, 'author required'),
  published_year: z.number().int().optional(),
  genre: z.string().optional()
});

module.exports = { bookSchema };
