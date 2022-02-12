const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var config = require('./config/config');

servers = [];

class Gameserver {
    constructor(name, slots, port) {
        this.id = servers.length;
        this.name = name;
        this.userCount = 0;
        this.slots = slots;
        this.port = port;
        this.online = false;
    }

    start(){ //Server start 
        const ServerExpress = require('express');
        const ServerApp = ServerExpress();
        const ServerHttp = require('http');
        const ServerServer = ServerHttp.createServer(ServerApp);
        const { Server } = require("socket.io");
        const io = new Server(ServerServer);

        ServerApp.use(ServerExpress.static(__dirname + '/game'));

        ServerApp.get('/', (req, res) => {
            res.sendFile(__dirname + '/index.html');
        });

        io.sockets.on('connection', (socket) => {
            console.log('a user connected');
            io.to(socket.id).emit("getConnectedServer", this);
            this.increaseUserCount();
            //this.stop(ServerServer);

            socket.on('createCharacter', (characterName, characterClass, characterServer) => {
                console.log(socket.id + " wants to create a character");
                console.log("Character name: " + characterName);
                console.log("Character Class: " + characterClass);
                console.log("On Server: " + characterServer);
            })

            socket.on("receiveServer", () => {
                io.to(socket.id).emit("getConnectedServer", this, config.mainServerPort);
            })

            socket.on('disconnect', () => {
                this.decreaseUserCount();
            });            
        });

        ServerServer.listen(this.port, () => {
            console.log("Server " + this.name + " started with port: " + this.port);
        });

        this.online = true;
        
    }

    stop(server){ //Server stop Script
        server.close();
        this.online = false;
    }

    increaseUserCount(){
        this.userCount++;
    }

    decreaseUserCount(){
        this.userCount--;
    }

    isServerOnline(){ //Get server status
        return this.online;
    }
}

app.use(express.static(__dirname + '/website'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

server.listen(config.mainServerPort, () => {
  console.log('The Servers will be started...');
  for (let i = 0; i <= config.serverCount; i++) {
    console.log(config.serverNames[i]);
    servers.push(new Gameserver(config.serverNames[i], config.serverSlots[i], config.serverPorts[i]));
    if(config.startAllServersAtTheBeginning){
        servers[i].start();
    }
  }
  console.log(servers);
});

io.on('connection', (socket) => {
    io.to(socket.id).emit('loadServers', servers);
});