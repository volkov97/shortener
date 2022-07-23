const express = require("express");

const { redirectLink } = require("./controllers/redirectLink");
const { ping } = require("./controllers/ping");
const { notFound } = require("./middlewares/notFound");

const app = express();

app.get("/ping", ping);
app.get("*", redirectLink);

app.use(notFound);

const PORT = 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
