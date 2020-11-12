'use strict';

const {Router} = require(`express`);
const {StatusCodes} = require(`http-status-codes`);
const offerValidator = require(`../middlewares/offer-validator`);
const findOffer = require(`../middlewares/find-offer`);
const commentValidator = require(`../middlewares/comment-validator`);


module.exports = (app, offerService, commentService) => {
  const route = new Router();
  app.use(`/offers`, route);

  route.get(`/`, (req, res) => {
    const offers = offerService.findAll();
    res.status(StatusCodes.OK).json(offers);
  });

  route.get(`/:offerId`, (req, res) => {
    const {offerId} = req.params;
    const offer = offerService.findOne(offerId);

    if (!offer) {
      return res.status(StatusCodes.NOT_FOUND)
        .send(`Not found with ${offerId}`);
    }

    return res.status(StatusCodes.OK)
      .json(offer);
  });

  route.delete(`/:offerId`, (req, res) => {
    const {offerId} = req.params;
    const offer = offerService.drop(offerId);

    if (!offer) {
      return res.status(StatusCodes.NOT_FOUND)
        .send(`Not found with ${offerId}`);
    }

    return res.status(StatusCodes.OK)
      .json(offer);
  });

  route.post(`/`, offerValidator, (req, res) => {
    const offer = offerService.create(req.body);

    return res.status(StatusCodes.CREATED)
      .json(offer);
  });

  route.put(`/:offerId`, offerValidator, (req, res) => {
    const {offerId} = req.params;
    const offer = offerService.update(offerId, req.body);

    if (!offer) {
      return res.status(StatusCodes.NOT_FOUND)
        .send(`Not found with ${offerId}`);
    }

    return res.status(StatusCodes.CREATED)
      .json(offer);
  });

  route.get(`/:offerId/comments`, findOffer(offerService), (req, res) => {
    const {offer} = res.locals;
    const comments = commentService.findAll(offer);

    res.status(StatusCodes.OK)
      .json(comments);
  });

  route.delete(`/:offerId/comments/:commentId`, findOffer(offerService), (req, res) => {
    const {offer} = res.locals;
    const {commentId} = req.params;
    const deletedComment = commentService.drop(offer, commentId);

    if (!deletedComment) {
      return res.status(StatusCodes.NOT_FOUND)
        .send(`Not found comment ${commentId}`);
    }

    return res.status(StatusCodes.OK)
      .json(deletedComment);
  });

  route.post(`/:offerId/comments`, [findOffer(offerService), commentValidator], (req, res) => {
    const {offer} = res.locals;
    const comment = commentService.create(offer, req.body);

    return res.status(StatusCodes.CREATED)
      .json(comment);
  });
};
