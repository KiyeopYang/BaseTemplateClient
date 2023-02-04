/* eslint-disable */
const path = require('path');
const dotenv = require('dotenv');

const { APP_ENV } = process.env;

module.exports = () =>
  dotenv.config({
    path: path.resolve(
      __dirname,
      APP_ENV === 'production'
        ? '.env.production'
        : APP_ENV === 'staging'
        ? '.env.staging'
        : '.env'
    ),
  });
