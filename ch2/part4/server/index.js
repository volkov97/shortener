const path = require("path");

const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const { resolveAlias } = require("./controllers/resolveAlias");
const { addAlias } = require("./controllers/addAlias");
const { ping } = require("./controllers/ping");
const { notFound } = require("./middlewares/notFound");
const { urlLogger } = require("./middlewares/urlLogger");
const { errorHandler } = require("./middlewares/errorHandler");

const app = express();

app.use(express.json());

app.use(
  "/",
  process.env.NODE_ENV
    ? express.static(path.resolve(__dirname, "../client/dist"))
    : createProxyMiddleware({
        target: "http://localhost:3001",
        changeOrigin: true,
      })
);

app.use(urlLogger);

app.get("/ping", ping);
app.get("/:alias", resolveAlias);
app.post("/alias", addAlias);

app.use(notFound);

app.use(errorHandler);

const PORT = 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
