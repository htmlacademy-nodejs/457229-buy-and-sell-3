'use strict';

const {
  getRandomInt,
  shuffle,
} = require(`../auxiliary/utils`);
const {
  DEFAULT_COUNT,
  TITLES,
  SENTENCES,
  CATEGORIES,
  OfferType,
  SumLimit,
  PictureCodeLimit,
  ExitCode
} = require(`../auxiliary/constants`);
const fs = require(`fs`);

const getPictureFileName = (code) => {
  const base = `item`;
  const extension = `jpg`;

  return `${base}${code}.${extension}`;
};

const generateAds = (count) => {
  return Array(count).fill({}).map(() => ({
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    picture: getPictureFileName(getRandomInt(PictureCodeLimit.MIN, PictureCodeLimit.MAX)),
    description: shuffle(SENTENCES).slice(1, 5).join(` `),
    type: Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)],
    sum: getRandomInt(SumLimit.MIN, SumLimit.MAX),
    category: [CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]],
  }));
};

module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;
    const adsCount = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateAds(adsCount));

    fs.writeFile(`mocks.json`, content, (err) => {
      if (err) {
        console.error(err);
        process.exit(ExitCode.ERROR);
      }
      console.info(`Operation success. File created.`);
      process.exit(ExitCode.SUCCESS);
    });
  }
};
