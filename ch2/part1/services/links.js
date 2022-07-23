const fs = require("fs/promises");
const path = require("path");

const { dbPath } = require("../config");

const linksDevFilePath = path.resolve(dbPath, "./links.dev.json");
const linksProdFilePath = path.resolve(dbPath, "./links.prod.json");

const links = require(process.env.LINKS_TYPE === "prod" ? linksProdFilePath : linksDevFilePath);

async function getLinkByIndex(linkIndex) {
  return links[linkIndex];
}

module.exports = {
    getLinkByIndex
};