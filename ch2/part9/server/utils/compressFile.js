const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

function compressFile(
  inputFilePath,
  outputFolder,
  resultFilename
) {
  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(inputFilePath);

    stream
      .pipe(zlib.createGzip())
      .pipe(
        fs.createWriteStream(path.resolve(outputFolder, `${Date.now()}_${resultFilename}.gz`), {
          flags: "a",
        })
      )
      .on("error", reject)
      .on("finish", resolve);
  });
}

module.exports = { compressFile };
