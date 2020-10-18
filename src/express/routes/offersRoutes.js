'use strict';

const {Router} = require(`express`);
const sendReqUrl = require(`../middlewares/sendReqUrl`);

const offersRouter = new Router();

offersRouter.get(`/add`, sendReqUrl);
offersRouter.get(`/:id`, sendReqUrl);
offersRouter.get(`/edit/:id`, sendReqUrl);
offersRouter.get(`/category/:id`, sendReqUrl);

module.exports = offersRouter;
