const devData = require("../data/development-data/index");
const testData = require("../data/test-data/index");

const data = { development: devData, test: testData, production: devData };

const ENV = process.env.NODE_ENV || "development";

module.exports = data[ENV];
