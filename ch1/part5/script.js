const fs = require("fs/promises");
const path = require("path");
const http = require("http");

const linksDevFilePath = path.resolve(__dirname, "./links.dev.txt");
const linksProdFilePath = path.resolve(__dirname, "./links.prod.txt");

const linksFilePath =
  process.env.NODE_ENV === "production" ? linksProdFilePath : linksDevFilePath;

async function printLinkByAlias(alias) {
  const linksFileContent = await fs.readFile(linksFilePath, "utf-8");

  const links = linksFileContent
    .split("\n") // get rows
    .filter((str) => !!str) // or just .filter(Boolean);
    .map((row) => row.split(" ")) // split alias from full link
    .reduce((acc, curr) => ({ ...acc, [curr[0]]: curr[1] }), {}); // construct links object

  return links[alias];
}

const server = http.createServer((request, response) => {
  console.log(request.url);

  const alias = request.url.slice(1);

  printLinkByAlias(alias).then((longLink) => {
    if (!longLink) {
      response.statusCode = 404;
      return response.end('not-found');
    }

    if (process.env.NODE_ENV === 'production') {
      response.setHeader('location', longLink);
      response.statusCode = 302;

      response.end();
    } else {
      response.end(longLink);
    }
  });
});

server.listen(3000, () => console.log("Server started on port 3000"));
