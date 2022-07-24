const express = require("express");

const { resolveAlias } = require("./controllers/resolveAlias");
const { addAlias } = require("./controllers/addAlias");
const { ping } = require("./controllers/ping");
const { notFound } = require("./middlewares/notFound");
const { errorHandler } = require("./middlewares/errorHandler");
const { accessLogs } = require("./middlewares/accessLogs");
const { dumpDatabase } = require("./utils/dumpDatabase");
const { monitorProcess } = require("./utils/monitorProcess");

const app = express();

app.use(express.json());

app.use(accessLogs());
app.use(accessLogs(true));

app.get("/ping", ping);
app.get("/:alias", resolveAlias);
app.post("/alias", addAlias);

app.use(notFound);

app.use(errorHandler);

const PORT = 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

dumpDatabase();
monitorProcess();