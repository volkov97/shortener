const path = require("path");
const http = require('http');

const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const { resolveAlias } = require("./controllers/resolveAlias");
const { addAlias } = require("./controllers/addAlias");
const { ping } = require("./controllers/ping");
const { notFound } = require("./middlewares/notFound");
const { errorHandler } = require("./middlewares/errorHandler");
const { accessLogs } = require("./middlewares/accessLogs");
const { dumpDatabase } = require("./utils/dumpDatabase");
const { monitorProcess } = require("./utils/monitorProcess");
const { secure } = require("./middlewares/security");
const { upgradeWithWs } = require("./ws");

const app = express();

secure(app);

app.use(express.json());

app.use(accessLogs());
app.use(accessLogs(true));

app.get("/ping", ping);
app.get("/:alias", resolveAlias);
app.post("/alias", addAlias);

app.use(express.static(path.resolve(__dirname, "../client/dist")));

app.use((request, response) => {
    response.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
});

app.use(notFound);

app.use(errorHandler);

const server = http.createServer(app);

upgradeWithWs(server);

const PORT = 3000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));

if (process.env.NODE_ENV === 'production') {
    dumpDatabase();
    monitorProcess();
}
