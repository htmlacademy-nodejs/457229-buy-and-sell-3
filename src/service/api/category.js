'use strict';

const {Router} = require(`express`);
const {StatusCodes} = require(`http-status-codes`);

const route = new Router();

module.exports = (app, categoryService) => {
  app.use(`/categories`, route);

  route.get(`/`, (req, res) => {
    const categories = categoryService.findAll();
    res.status(StatusCodes.OK)
      .json(categories);
  });
};
