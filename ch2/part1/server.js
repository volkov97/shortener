const express = require("express");

const { resolveAlias } = require("./controllers/resolveAlias");
const { ping } = require("./controllers/ping");
const { notFound } = require("./middlewares/notFound");
const { urlLogger } = require("./middlewares/urlLogger");

const app = express();

app.use(urlLogger);

app.get("/ping", ping);
app.get("/:alias", resolveAlias);

app.use(notFound);

const PORT = 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
