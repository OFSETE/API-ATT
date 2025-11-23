require('dotenv').config();
const express = require('express');
require('express-async-errors');
const cors = require('cors');
const morgan = require('morgan');

const postsRouter = require('./routes/posts');
const booksRouter = require('./routes/books');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => res.json({ ok: true, message: 'API Supabase Posts' }));
app.use('/posts', postsRouter);
app.use('/books', booksRouter);

app.use(errorHandler);

module.exports = app;
