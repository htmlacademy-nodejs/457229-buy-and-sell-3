'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {
  getRandomInt,
  shuffle,
} = require(`../auxiliary/utils`);
const {
  DESCRIPTION_LENGTH_LIMIT,
  MAX_ADS_COUNT,
  DEFAULT_COUNT,
  OfferType,
  SumLimit,
  PictureCodeLimit,
  ExitCode
} = require(`../auxiliary/constants`);
const FILE_SENTENCES_PATH = `${__dirname}/../../../data/sentences.txt`;
const FILE_TITLES_PATH = `${__dirname}/../../../data/titles.txt`;
const FILE_CATEGORIES_PATH = `${__dirname}/../../../data/categories.txt`;

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.split(`\n`)
      .filter((el) => el.length > 0);

  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const getPictureFileName = (code) => `item${String(code).padStart(2, `0`)}.jpg`;

const generateAds = (count, titles, categories, sentences) => {
  return Array(count).fill({}).map(() => ({
    title: titles[getRandomInt(0, titles.length - 1)],
    picture: getPictureFileName(getRandomInt(PictureCodeLimit.MIN, PictureCodeLimit.MAX)),
    description: shuffle(sentences).slice(1, DESCRIPTION_LENGTH_LIMIT + 1).join(` `),
    type: Object.values(OfferType)[Math.floor(Math.random() * Object.values(OfferType).length)],
    sum: getRandomInt(SumLimit.MIN, SumLimit.MAX),
    category: shuffle(categories).slice(0, getRandomInt(1, categories.length)),
  }));
};

const runGenerateAndSaveScenario = async (args) => {
  const sentences = await readContent(FILE_SENTENCES_PATH);
  const titles = await readContent(FILE_TITLES_PATH);
  const categories = await readContent(FILE_CATEGORIES_PATH);

  const [count] = args;
  const adsCount = Number.parseInt(count, 10) || DEFAULT_COUNT;
  if (adsCount > MAX_ADS_COUNT) {
    console.error(chalk.red(`Не больше ${MAX_ADS_COUNT} объявлений`));
    process.exit(ExitCode.SUCCESS);
  }

  const content = JSON.stringify(generateAds(adsCount, titles, categories, sentences));
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
