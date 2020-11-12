'use strict';

const {Router} = require(`express`);
const {StatusCodes} = require(`http-status-codes`);

const route = new Router();

module.exports = (app, searchService) => {
  app.use(`/search`, route);

  route.get(`/`, (req, res) => {
    const {query = ``} = req.query;
    if (!query) {
      res.status(StatusCodes.BAD_REQUEST).json([]);
      return;
    }

    const searchResults = searchService.findAll(query);
    const searchStatus = searchResults.length > 0 ? StatusCodes.OK : StatusCodes.NOT_FOUND;

    res.status(searchStatus)
      .json(searchResults);
  });
};
