'use strict';

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;
const MAX_ADS_COUNT = 1000;
const USER_ARGV_INDEX = 2;
const DEFAULT_COMMAND = `--help`;
const DESCRIPTION_LENGTH_LIMIT = 5;

const HELP_TEXT = `
Программа запускает http-сервер и формирует файл с данными для API.

    Гайд:
    service.js <command>

    Команды:
    --version:            выводит номер версии
    --help:               печатает этот текст
    --generate <count>    формирует файл mocks.json
`;

const OfferType = {
  OFFER: `offer`,
  SALE: `sale`,
};

const SumLimit = {
  MIN: 1000,
  MAX: 100000,
};

const PictureCodeLimit = {
  MIN: 1,
  MAX: 16
};

const ExitCode = {
  SUCCESS: 0,
  ERROR: 1,
};

module.exports = {
  DESCRIPTION_LENGTH_LIMIT,
  ExitCode,
  DEFAULT_COUNT,
  USER_ARGV_INDEX,
  DEFAULT_COMMAND,
  FILE_NAME,
  MAX_ADS_COUNT,
  OfferType,
  SumLimit,
  PictureCodeLimit,
  HELP_TEXT,
};
