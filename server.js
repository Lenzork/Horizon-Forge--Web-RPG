const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// Getting the Config Settings
var config = require('./config/config');

// Server Array to get the list of Servers and their Informations
servers = [];

// Gameserver Class to store all of the needed Informations into one Object
class Gameserver {
    constructor(name, slots, port) {
        this.id = servers.length;
        this.name = name;
        this.userCount = 0;
        this.slots = slots;
        this.port = port;
        this.blacklistedNames = [];
        this.online = false;
    }

    start(mysqlServer, mysqlUser, mysqlPassword, mysqlDatabaseName){ //Server start
        const ServerExpress = require('express');
        const ServerApp = ServerExpress();
        const ServerHttp = require('http');
        const ServerServer = ServerHttp.createServer(ServerApp);
        const { Server } = require("socket.io");
        const io = new Server(ServerServer);
        var mysql = require('mysql');

        //Login Form Elements
        const session = require('express-session');
        const path = require('path');
        const bcrypt = require('bcrypt');

        var gameserver = this;

        ServerApp.engine('html', require('ejs').renderFile);

        ServerApp.use(session({
            secret: 'secret',
            resave: true,
            saveUninitialized: true
        }));
        ServerApp.use(ServerExpress.json());
        ServerApp.use(ServerExpress.urlencoded({ extended: true }));
        ServerApp.use(ServerExpress.static(path.join(__dirname, 'static')));

        ServerApp.use(ServerExpress.static(path.join(__dirname + '/game/character-creation')));
        ServerApp.use(ServerExpress.static(path.join(__dirname + '/game/game')));

        ServerApp.get('/', (req, res) => {
            res.render(path.join(__dirname + '/index.html'));
        });

        ServerApp.get('/login', (req, res) => {
            res.render(path.join(__dirname + '/game/login/index.html'));
        });

        var con = mysql.createConnection({
            host: mysqlServer,
            user: mysqlUser,
            password: mysqlPassword,
            database: mysqlDatabaseName
        });

        //Get blacklisted names from Database
        con.connect(function(err) {
            if (err) throw err;
            con.query("SELECT * FROM blacklisted_names", function (err, result, fields) {
              if (err) throw err;
              result.forEach((entry) => {gameserver.addBlacklistedName(entry.name);})
            });
        });

        io.of("/").on('connection', (socket) => {
            console.log('a user connected');

            io.to(socket.id).emit("getConnectedServer", this, config.mainServerPort, io.engine.clientsCount, this.blacklistedNames);
            //this.stop(ServerServer);  <--Stop the Server

            socket.on('createCharacter', (characterName, characterClass, characterServer) => {
                console.log(socket.id + " wants to create a character");
                console.log("Character name: " + characterName);
                console.log("Character Class: " + characterClass);
                console.log("On Server: " + characterServer);
            })

            socket.on("receiveServer", () => {
                io.to(socket.id).emit("getConnectedServer", this, config.mainServerPort, io.engine.clientsCount, this.blacklistedNames);
            })

            socket.on('disconnect', () => {
            });            
        });

        io.of("/game").on('connection', (socket) => {
            console.log('Game connection');        
        });

        


        // Login Auth
        ServerApp.post('/auth', function(request, response) {
            // Capture the input fields
            let username = request.body.username;
            let password = request.body.password;

            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                throw err;
                }
                password = hash;
                console.log('Your hash: ', password);
            });
            // Ensure the input fields exists and are not empty
            if (username && password) {
                // Execute SQL query that'll select the account from the database based on the specified username and password
                con.query('SELECT * FROM characters WHERE name = ? AND code = ?', [username, password], function(error, results, fields) {
                    // If there is an issue with the query, output the error
                    if (error) throw error;
                    // If the account exists
                    if (results.length > 0) {
                        // Authenticate the user
                        request.session.loggedin = true;
                        request.session.username = username;
                        // Redirect to home page
                        response.redirect('/game');
                    } else {
                        response.send('Incorrect Username and/or Password!');
                    }			
                    response.end();
                });
            } else {
                response.send('Please enter Username and Password!');
                response.end();
            }
        });

        ServerApp.get('/game', function(request, response) {
            // If the user is loggedin
            if (request.session.loggedin) {
                // Output username
                console.log("true");
                response.render(__dirname + "/game/game/index.html");
            } else {
                // Not logged in
                response.redirect('../');
                console.log("false");
            }
            response.end();
        });

        ServerServer.listen(this.port, () => {
            console.log("Server " + this.name + " started with port: " + this.port);
        });

        this.online = true;
        
    }

    addBlacklistedName(name){
        this.blacklistedNames.push(name);
    }

    stop(givenServer){ //Server stop Script
        givenServer.close();
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
        servers[i].start(config.mysqlServerAdress[i], config.mysqlUser[i], config.mysqlPassword[i], config.mysqlDatabaseName[i]);
    }
  }
  console.log(servers);
});

io.on('connection', (socket) => {
    io.to(socket.id).emit('loadServers', servers);
});