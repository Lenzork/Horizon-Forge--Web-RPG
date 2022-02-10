const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
var config = require('./config/config');

servers = [];

class Server {
    constructor(name, slots, port) {
        this.id = servers.length;
        this.name = name;
        this.slots = slots;
        this.port = port;
        this.online = false;
    }

    start(){ //Server start Script
    
    }

    stop(){ //Server stop Script

    }

    isServerOnline(){ //Get server status
        return this.online;
    }
}

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

server.listen(3000, () => {
  console.log('The Servers will be started...');
  for (let i = 0; i <= config.serverCount; i++) {
    console.log(config.serverNames[i]);
    servers.push(new Server(config.serverNames[i], config.serverSlots[i], config.serverPorts[i]));
  }
  console.log(servers);
});