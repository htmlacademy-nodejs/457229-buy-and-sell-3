'use strict';

const {Router} = require(`express`);
const {getMockData} = require(`../lib/get-mock-data`);
const category = require(`./category`);
const offer = require(`../api/offer`);
const search = require(`./search`);


const {
  CategoryService,
  SearchService,
  OfferService,
  CommentService,
} = require(`../data-service`);

const app = new Router();

(async () => {
  const mockData = await getMockData();

  category(app, new CategoryService(mockData));
  search(app, new SearchService(mockData));
  offer(app, new OfferService(mockData), new CommentService());
})();

module.exports = app;
