'use strict';

const express = require(`express`);
const offersRouter = require(`./routes/offersRoutes`);
const myRouter = require(`./routes/myRoutes`);
const mainRouter = require(`./routes/mainRoutes`);

const app = express();
const PORT = 8000;


app.use(`/offers`, offersRouter);
app.use(`/my`, myRouter);
app.use(`/`, mainRouter);

app.listen(PORT);
