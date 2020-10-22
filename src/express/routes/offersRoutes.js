'use strict';

const {Router} = require(`express`);

const offersRouter = new Router();

offersRouter.get(`/add`, (req, res) => res.render(`new-ticket`));
offersRouter.get(`/:id`, (req, res) => res.render(`ticket`));
offersRouter.get(`/edit/:id`, (req, res) => res.render(`ticket-edit`));
offersRouter.get(`/category/:id`, (req, res) => res.render(`category`));

module.exports = offersRouter;
