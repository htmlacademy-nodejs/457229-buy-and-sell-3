'use strict';

const {
  getRandomInt,
  shuffle,
} = require(`../auxiliary/utils`);
const {
  DESCRIPTION_LENGTH_LIMIT,
  MAX_ADS_COUNT,
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

const getPictureFileName = (code) => `item${String(code).padStart(2, `0`)}.jpg`;

const generateAds = (count) => {
  return Array(count).fill({}).map(() => ({
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    picture: getPictureFileName(getRandomInt(PictureCodeLimit.MIN, PictureCodeLimit.MAX)),
    description: shuffle(SENTENCES).slice(1, DESCRIPTION_LENGTH_LIMIT + 1).join(` `),
    type: Object.values(OfferType)[Math.floor(Math.random() * Object.values(OfferType).length)],
    sum: getRandomInt(SumLimit.MIN, SumLimit.MAX),
    category: shuffle(CATEGORIES).slice(0, getRandomInt(1, CATEGORIES.length)),
  }));
};

const runGenerateAndSaveScenario = (args) => {
  const [count] = args;
  const adsCount = Number.parseInt(count, 10) || DEFAULT_COUNT;
  if (adsCount > MAX_ADS_COUNT) {
    console.error(`Не больше ${MAX_ADS_COUNT} объявлений`);
    process.exit(ExitCode.SUCCESS);
  }

  const content = JSON.stringify(generateAds(adsCount));
  fs.writeFile(`${__dirname}/../../../mocks.json`, content, (err) => {
    if (err) {
      console.error(err);
      process.exit(ExitCode.ERROR);
    }
    console.info(`Operation success. File created.`);
    process.exit(ExitCode.SUCCESS);
  });
};

module.exports = {
  name: `--generate`,
  run(args) {
    runGenerateAndSaveScenario(args);
  }
};
