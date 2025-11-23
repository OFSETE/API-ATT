const { z } = require('zod');

const postSchema = z.object({
  title: z.string().min(1, 'title required'),
  content: z.string().min(1, 'content required')
});

module.exports = { postSchema };
