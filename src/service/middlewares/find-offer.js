'use strict';

const {StatusCodes} = require(`http-status-codes`);

module.exports = (service) => (req, res, next) => {
  const {offerId} = req.params;
  const offer = service.findOne(offerId);

  if (!offer) {
    return res.status(StatusCodes.NOT_FOUND)
      .send(`Offer with ${offerId} not found`);
  }

  res.locals.offer = offer;
  return next();
};
