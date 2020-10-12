'use strict';

const chalk = require(`chalk`);
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
const fs = require(`fs`).promises;

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

const runGenerateAndSaveScenario = async (args) => {
  const [count] = args;
  const adsCount = Number.parseInt(count, 10) || DEFAULT_COUNT;
  if (adsCount > MAX_ADS_COUNT) {
    console.error(chalk.red(`Не больше ${MAX_ADS_COUNT} объявлений`));
    process.exit(ExitCode.SUCCESS);
  }

  const content = JSON.stringify(generateAds(adsCount));
  try {
    await fs.writeFile(`${__dirname}/../../../mocks.json`, content);
    console.info(chalk.green(`Operation success. File created.`));
    process.exit(ExitCode.SUCCESS);

  } catch (err) {
    console.error(chalk.red(err));
    process.exit(ExitCode.ERROR);
  }
};

module.exports = {
  name: `--generate`,
  async run(args) {
    await runGenerateAndSaveScenario(args);
  }
};
