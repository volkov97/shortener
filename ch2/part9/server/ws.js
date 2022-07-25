const WebSocket = require('ws');
const { wsClients } = require('./modules/wsClients');

function upgradeWithWs(server) {
  const wsServer = new WebSocket.Server({ server });

  wsServer.on('connection', async (ws, req) => {
    if (req.url === '/online-alias') {
      wsClients.add(ws);

      ws.on('error', () => {
        ws.close();
      });

      ws.on('close', () => {
        wsClients.remove(ws);
      });
    }
  });
};

module.exports = { upgradeWithWs }