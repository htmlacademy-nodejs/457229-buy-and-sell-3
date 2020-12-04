'use strict';

const {StatusCodes} = require(`http-status-codes`);
const offerKeys = [`category`, `description`, `picture`, `title`, `type`, `sum`];

module.exports = (req, res, next) => {
  const newOffer = req.body;
  const keys = Object.keys(newOffer);
  const missingProperties = [];

  const keysExist = offerKeys.every((key) => {
    const isKeyPresent = keys.includes(key);
    if (!isKeyPresent) {
      missingProperties.push(key);
    }

    return isKeyPresent;
  });

  if (!keysExist) {
    res.status(StatusCodes.BAD_REQUEST)
      .send(`Bad request. Missing properties are: ${missingProperties}`);
  }

  next();
};
