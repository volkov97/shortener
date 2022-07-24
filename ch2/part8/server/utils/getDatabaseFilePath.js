const path = require("path");

const { dbPath } = require("../config");

function getDatabaseFilePath() {
  const linksDevFilePath = path.resolve(dbPath, "./links.dev.json");
  const linksProdFilePath = path.resolve(dbPath, "./links.prod.json");

  return process.env.LINKS_TYPE === "prod"
    ? linksProdFilePath
    : linksDevFilePath;
}

module.exports = { getDatabaseFilePath };