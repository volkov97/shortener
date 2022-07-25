const path = require("path");
const { dbPath } = require("../config");
const { compressFile } = require("../utils/compressFile");
const { getDatabaseFilePath } = require("../utils/getDatabaseFilePath");

const linksFilePath = getDatabaseFilePath();

function dumpDatabase() {
  // better use https://www.npmjs.com/package/cron
  setInterval(() => {
    compressFile(linksFilePath, path.resolve(dbPath, "dumps"), "db-dump.json");

    console.log('Database dump was created.');
  }, 60000);
}

module.exports = { dumpDatabase };
