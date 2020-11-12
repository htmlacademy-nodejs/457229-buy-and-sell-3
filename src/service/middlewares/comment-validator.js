'use strict';

const {StatusCodes} = require(`http-status-codes`);

const commentKeys = [`text`];

module.exports = (req, res, next) => {
  const comment = req.body;
  const keys = Object.keys(comment);
  const keysExist = commentKeys.every((key) => keys.includes(key));

  if (!keysExist) {
    return res.status(StatusCodes.BAD_REQUEST)
      .send(`Bad request`);
  }

  return next();
};
