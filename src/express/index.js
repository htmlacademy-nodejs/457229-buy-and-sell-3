'use strict';

const express = require(`express`);
const path = require(`path`);
const offersRouter = require(`./routes/offersRoutes`);
const myRouter = require(`./routes/myRoutes`);
const mainRouter = require(`./routes/mainRoutes`);

const PORT = 8000;
const PUBLIC_DIR = `public`;

const app = express();

app.use(`/offers`, offersRouter);
app.use(`/my`, myRouter);
app.use(`/`, mainRouter);


app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));
app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.listen(PORT);
console.info(`Starting server on port ${PORT}`);
