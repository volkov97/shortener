const fs = require("fs");
const path = require("path");
const morgan = require("morgan");

function accessLogs(toFile = false) {
  return morgan(":method :url - :status :response-time ms", {
    stream: toFile
      ? fs.createWriteStream(path.resolve(__dirname, "../access.log"), { flags: 'a' })
      : undefined,
  });
}

module.exports = { accessLogs };
