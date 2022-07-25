class WsClients {
  constructor() {
    this.clients = [];
  }

  add(ws) {
    this.clients.push(ws);

    this.logClientsCount();
  }

  remove(ws) {
    this.clients = this.clients.filter((client) => client !== ws);

    this.logClientsCount();
  }

  forEach(callback) {
    this.logClientsCount();
    
    this.clients.forEach((client) => callback(client));
  }

  logClientsCount() {
    console.log(`ws clients count: ${this.clients.length}`);
  }
}

module.exports = { wsClients: new WsClients() };
