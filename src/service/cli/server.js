'use strict';

const express = require(`express`);
const {StatusCodes} = require(`http-status-codes`);
const {
  ERROR,
  API_PREFIX,
} = require(`../auxiliary/constants`);
const routes = require(`../api`);

const DEFAULT_PORT = 3000;
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`Request on route ${req.url}`);
  res.on(`finish`, () => {
    console.log(`Response status code ${res.statusCode}`);
  });
  next();
});


app.use(API_PREFIX, routes);

app.use((req, res) => res
  .status(StatusCodes.NOT_FOUND)
  .send(`Not found`));

module.exports = {
  name: `--server`,
  async run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;
    try {
      app.listen(port);
      console.info(`Server started on port ${port}`);
    } catch (e) {
      process.exit(ERROR);
    }
  }
};
