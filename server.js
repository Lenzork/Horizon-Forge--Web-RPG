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
        ServerApp.use(ServerExpress.static(path.join(__dirname + '/game/inventory')));
        ServerApp.use(ServerExpress.static(path.join(__dirname + '/game/marketplace')));
        ServerApp.use(ServerExpress.static(path.join(__dirname + '/game/inbox')));

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

        // Socket io Connection
        io.sockets.on('connection', (socket) => {
            console.log('a user connected');

            socket.on('create', function(room) {
                socket.join(room);
                io.sockets.in(room).emit('RoomsVerification', 'You are in ' + room);
            });

            //this.stop(ServerServer);  <--Stop the Server

            socket.on('createCharacter', (characterName, characterCode, characterClass, characterServer, characterPicture) => {
                var canCreate = false;

                function getCanCreate(){
                    return canCreate;
                }

                function setCanCreate(value){
                    canCreate = value;
                }

                con.query("SELECT * FROM characters WHERE name = ?", characterName, function(error, results, fields) {
                    if(error) throw error;
                    if(results.length == 0){
                        setCanCreate(true);
                    }
                

                console.log(getCanCreate());

                if(getCanCreate()) {
                    console.log(socket.id + " wants to create a character");
                    console.log("Character name: " + characterName);
                    console.log("Character Class: " + characterClass);
                    console.log("On Server: " + characterServer);

                    var characterPortrait;

                    if(characterClass == "Warrior"){
                        characterPortrait = "24.png";
                    }
                    if(characterClass == "Wizard"){
                        characterPortrait = "23.png";
                    }
                    if(characterClass == "Archer"){
                        characterPortrait = "28.png";
                    }
                    bcrypt.genSalt(10, function(err, salt) {  
                        bcrypt.hash(characterCode, salt, (err, hash) => {
                            if (err) {
                            throw err;
                            }
                            
                            con.query('SELECT id FROM characters ORDER BY id DESC LIMIT 1;', function(error, results, fields) {
                                if (error) throw error;
                                console.log(results[0].id);
                            
                            con.query('INSERT INTO `characters` (`id`, `name`, `code`, `level`, `portrait`, `class`, `attackpower`, `health`, `defense`, `pvpcr`) VALUES (?, ?, ?, 1, ?, ?, 100, 100, 100, 0);', [results[0].id + 1, characterName, hash, characterPortrait, characterClass], function(error2, results2, fields2) {
                                if (error2) throw error2;
                                console.log("Created new character!");
                            })
                            })
                        });
                    });

                    io.to(socket.id).emit("sendAlert", "Character has been created successfully!");
                } else {
                    io.to(socket.id).emit("sendAlert", "A Character with that Name already exists");
                }
            })
            });

            socket.on("receiveServer", () => {
                io.to(socket.id).emit("getConnectedServer", this, config.mainServerPort, io.engine.clientsCount, this.blacklistedNames);
            })

            socket.on("getPVPRanks", () => {
                console.log("User " + socket.id + " wants to receive the PVP Ranks");
                con.query('SELECT * FROM pvpranks', function(error, results, fields) {
                    if (error) throw error;
                    for (var i = 0; i < results.length; i++){
                        io.to(socket.id).emit("createNewPVPRank", results[i].id, results[i].name, results[i].icon, results[i].mincr);
                    }
                })
                io.to(socket.id).emit("readyToRenderPVPRanks");
            })

            socket.on("getUserTitles", () => {
                con.query('SELECT * FROM titles', function(error, results, fields) {
                    if (error) throw error;
                    for (var i = 0; i < results.length; i++){
                        io.to(socket.id).emit("receiveTitle", results[i].id, results[i].title);
                    }
                })
                io.to(socket.id).emit("setReadyToRenderTitle");
            })

            socket.on("getItem", (id) => {
                con.query("SELECT * FROM items WHERE id = ?", id, (error, results, fields) => {
                    if(error) throw error;
                    io.to(socket.id).emit("receiveItemStrengthValue", results[0].bonus_damage);
                    io.to(socket.id).emit("receiveItemHealthValue", results[0].bonus_health);
                    io.to(socket.id).emit("receiveItemDefenseValue", results[0].bonus_defense);
                })
            })

            socket.on("joinedGame", () => {
                socket.join("ingame");

                var itemRarities = [];

                con.query('SELECT * FROM itemtypes', function(error, results, fields) {
                    if (error) throw error;

                    for (var i = 0; i < results.length; i++){
                        itemRarities.push(results[i].name);
                    }
                })

                // Getting character information
                con.query("SELECT * FROM characters WHERE name = ?", socket.username, function(error, results, fields) {
                    if (error) throw error;
                    console.log(results);
                    var equippedItems = [results[0].equipped_head, results[0].equipped_chest, results[0].equipped_leg, results[0].equipped_hand, results[0].equipped_boot, results[0].equipped_weapon];
                    io.to(socket.id).emit("loginVerification", results[0].id, results[0].name, results[0].level, results[0].class, results[0].portrait, results[0].attackpower, results[0].health, results[0].defense, itemRarities, results[0].pvpcr, results[0].title, equippedItems);
                    socket.dbID = results[0].id;
                    socket.leave("characterCreation");
                    console.log(socket.id + " is now ingame with " + results[0].name);
                    io.sockets.in("ingame").emit('RoomsVerification', 'You are ingame');
                })
            })

            /* EQUIPMENT SOCKETS */
            /* HELMET */
            socket.on("equip_head", (itemid) => {
                con.query("SELECT id FROM characters WHERE name = ?", socket.username, function(error, results, fields) {
                    if (error) throw error;
                    console.log(results[0].id);
                    console.log(results[0].id + " " + itemid);
                    con.query("SELECT * FROM characters_inventorys WHERE characterid = ? AND itemid = ?", [results[0].id, itemid], function(error, results2, fields) {
                        if (error) throw error;
                        console.log(results2.length);
                        con.query("SELECT * FROM items WHERE id = ?", results2[0].itemid, function(error, results3, fields) {
                            if (error) throw error;
                            if(results2.length > 0 && results3[0].type == 0){
                                console.log(socket.username + " equipped an helmet with the id " + itemid);
                                con.query("UPDATE characters SET equipped_head = ? WHERE id = ?", [itemid, results[0].id], function(error, results, fields) {
                                    if (error) throw error;
                                });
                            } else {
                                console.log("User " + socket.username + " tried to equip an head (ID: " + results2[0].itemid + ") which has not the correct itemtype for head Slot");
                            }
                        })
                    })
                })
            })
            socket.on("unequip_head", (itemid) => {
                con.query("SELECT id FROM characters WHERE name = ?", socket.username, function(error, results, fields) {
                    if (error) throw error;
                    console.log(results[0].id);
                    console.log(results[0].id + " " + itemid);
                    con.query("SELECT * FROM characters_inventorys WHERE characterid = ? AND itemid = ?", [results[0].id, itemid], function(error, results2, fields) {
                        if (error) throw error;
                        console.log(results2.length);
                        if(results2.length > 0){
                            console.log(socket.username + " unequipped an helmet with the id " + itemid);
                            con.query("UPDATE characters SET equipped_head = ? WHERE id = ?", [-1, results[0].id], function(error, results, fields) {
                                if (error) throw error;
                            });
                        }
                    })
                })
            })

            /* CHEST */
            socket.on("equip_chest", (itemid) => {
                con.query("SELECT id FROM characters WHERE name = ?", socket.username, function(error, results, fields) {
                    if (error) throw error;
                    console.log(results[0].id);
                    console.log(results[0].id + " " + itemid);
                    con.query("SELECT * FROM characters_inventorys WHERE characterid = ? AND itemid = ?", [results[0].id, itemid], function(error, results2, fields) {
                        if (error) throw error;
                        console.log(results2.length);
                        con.query("SELECT * FROM items WHERE id = ?", results2[0].itemid, function(error, results3, fields) {
                            if (error) throw error;
                            if(results2.length > 0 && results3[0].type == 1){
                                console.log(socket.username + " equipped an chest with the id " + itemid);
                                con.query("UPDATE characters SET equipped_chest = ? WHERE id = ?", [itemid, results[0].id], function(error, results, fields) {
                                    if (error) throw error;
                                });
                            } else {
                                console.log("User " + socket.username + " tried to equip an chest (ID: " + results2[0].itemid + ") which has not the correct itemtype for chest Slot");
                            }
                        })
                    })
                })
            })
            socket.on("unequip_chest", (itemid) => {
                con.query("SELECT id FROM characters WHERE name = ?", socket.username, function(error, results, fields) {
                    if (error) throw error;
                    console.log(results[0].id);
                    console.log(results[0].id + " " + itemid);
                    con.query("SELECT * FROM characters_inventorys WHERE characterid = ? AND itemid = ?", [results[0].id, itemid], function(error, results2, fields) {
                        if (error) throw error;
                        console.log(results2.length);
                        if(results2.length > 0){
                            console.log(socket.username + " unequipped an chest with the id " + itemid);
                            con.query("UPDATE characters SET equipped_chest = ? WHERE id = ?", [-1, results[0].id], function(error, results, fields) {
                                if (error) throw error;
                            });
                        }
                    })
                })
            })

            /* Leg */
            socket.on("equip_leg", (itemid) => {
                con.query("SELECT id FROM characters WHERE name = ?", socket.username, function(error, results, fields) {
                    if (error) throw error;
                    console.log(results[0].id);
                    console.log(results[0].id + " " + itemid);
                    con.query("SELECT * FROM characters_inventorys WHERE characterid = ? AND itemid = ?", [results[0].id, itemid], function(error, results2, fields) {
                        if (error) throw error;
                        console.log(results2.length);
                        con.query("SELECT * FROM items WHERE id = ?", results2[0].itemid, function(error, results3, fields) {
                            if (error) throw error;
                            if(results2.length > 0 && results3[0].type == 2){
                                console.log(socket.username + " equipped an leg with the id " + itemid);
                                con.query("UPDATE characters SET equipped_leg = ? WHERE id = ?", [itemid, results[0].id], function(error, results, fields) {
                                    if (error) throw error;
                                });
                            } else {
                                console.log("User " + socket.username + " tried to equip an leg (ID: " + results2[0].itemid + ") which has not the correct itemtype for leg Slot");
                            }
                        })
                    })
                })
            })
            socket.on("unequip_leg", (itemid) => {
                con.query("SELECT id FROM characters WHERE name = ?", socket.username, function(error, results, fields) {
                    if (error) throw error;
                    console.log(results[0].id);
                    console.log(results[0].id + " " + itemid);
                    con.query("SELECT * FROM characters_inventorys WHERE characterid = ? AND itemid = ?", [results[0].id, itemid], function(error, results2, fields) {
                        if (error) throw error;
                        console.log(results2.length);
                        if(results2.length > 0){
                            console.log(socket.username + " unequipped an leg with the id " + itemid);
                            con.query("UPDATE characters SET equipped_leg = ? WHERE id = ?", [-1, results[0].id], function(error, results, fields) {
                                if (error) throw error;
                            });
                        }
                    })
                })
            })

            /* Hand */
            socket.on("equip_hand", (itemid) => {
                con.query("SELECT id FROM characters WHERE name = ?", socket.username, function(error, results, fields) {
                    if (error) throw error;
                    console.log(results[0].id);
                    console.log(results[0].id + " " + itemid);
                    con.query("SELECT * FROM characters_inventorys WHERE characterid = ? AND itemid = ?", [results[0].id, itemid], function(error, results2, fields) {
                        if (error) throw error;
                        console.log(results2.length);
                        con.query("SELECT * FROM items WHERE id = ?", results2[0].itemid, function(error, results3, fields) {
                            if (error) throw error;
                            if(results2.length > 0 && results3[0].type == 3){
                                console.log(socket.username + " equipped an hand with the id " + itemid);
                                con.query("UPDATE characters SET equipped_hand = ? WHERE id = ?", [itemid, results[0].id], function(error, results, fields) {
                                    if (error) throw error;
                                });
                            } else {
                                console.log("User " + socket.username + " tried to equip an hand (ID: " + results2[0].itemid + ") which has not the correct itemtype for hand Slot");
                            }
                        })
                    })
                })
            })
            socket.on("unequip_hand", (itemid) => {
                con.query("SELECT id FROM characters WHERE name = ?", socket.username, function(error, results, fields) {
                    if (error) throw error;
                    console.log(results[0].id);
                    console.log(results[0].id + " " + itemid);
                    con.query("SELECT * FROM characters_inventorys WHERE characterid = ? AND itemid = ?", [results[0].id, itemid], function(error, results2, fields) {
                        if (error) throw error;
                        console.log(results2.length);
                        if(results2.length > 0){
                            console.log(socket.username + " unequipped an hand with the id " + itemid);
                            con.query("UPDATE characters SET equipped_hand = ? WHERE id = ?", [-1, results[0].id], function(error, results, fields) {
                                if (error) throw error;
                            });
                        }
                    })
                })
            })

            /* Boot */
            socket.on("equip_boot", (itemid) => {
                con.query("SELECT id FROM characters WHERE name = ?", socket.username, function(error, results, fields) {
                    if (error) throw error;
                    console.log(results[0].id);
                    console.log(results[0].id + " " + itemid);
                    con.query("SELECT * FROM characters_inventorys WHERE characterid = ? AND itemid = ?", [results[0].id, itemid], function(error, results2, fields) {
                        if (error) throw error;
                        console.log(results2.length);
                        con.query("SELECT * FROM items WHERE id = ?", results2[0].itemid, function(error, results3, fields) {
                            if (error) throw error;
                            if(results2.length > 0 && results3[0].type == 4){
                                console.log(socket.username + " equipped an boot with the id " + itemid);
                                con.query("UPDATE characters SET equipped_boot = ? WHERE id = ?", [itemid, results[0].id], function(error, results, fields) {
                                    if (error) throw error;
                                });
                            } else {
                                console.log("User " + socket.username + " tried to equip an boot (ID: " + results2[0].itemid + ") which has not the correct itemtype for boot Slot");
                            }
                        })
                    })
                })
            })
            socket.on("unequip_boot", (itemid) => {
                con.query("SELECT type FROM items WHERE id = ?", itemid, function(error, results, fields){
                    if(error) throw error;
                    if(results[0].type == 4){
                    con.query("SELECT id FROM characters WHERE name = ?", socket.username, function(error, results, fields) {
                        if (error) throw error;
                        console.log(results[0].id);
                        console.log(results[0].id + " " + itemid);
                        con.query("SELECT * FROM characters_inventorys WHERE characterid = ? AND itemid = ?", [results[0].id, itemid], function(error, results2, fields) {
                            if (error) throw error;
                            console.log(results2.length);
                            if(results2.length > 0){
                                console.log(socket.username + " unequipped an boot with the id " + itemid);
                                con.query("UPDATE characters SET equipped_boot = ? WHERE id = ?", [-1, results[0].id], function(error, results, fields) {
                                    if (error) throw error;
                                });
                            }
                        })
                    })
                    }
                });
            })

            /* Weapon */
            socket.on("equip_weapon", (itemid) => {
                con.query("SELECT id FROM characters WHERE name = ?", socket.username, function(error, results, fields) {
                    if (error) throw error;
                    console.log(results[0].id);
                    console.log(results[0].id + " " + itemid);
                    con.query("SELECT * FROM characters_inventorys WHERE characterid = ? AND itemid = ?", [results[0].id, itemid], function(error, results2, fields) {
                        if (error) throw error;
                        console.log(results2.length);
                        con.query("SELECT * FROM items WHERE id = ?", results2[0].itemid, function(error, results3, fields) {
                            if (error) throw error;
                            if(results2.length > 0 && results3[0].type == 5){
                                console.log(socket.username + " equipped an weapon with the id " + itemid);
                                con.query("UPDATE characters SET equipped_weapon = ? WHERE id = ?", [itemid, results[0].id], function(error, results, fields) {
                                    if (error) throw error;
                                });
                            } else {
                                console.log("User " + socket.username + " tried to equip an weapon (ID: " + results2[0].itemid + ") which has not the correct itemtype for weapon Slot");
                            }
                        })
                    })
                })
            })
            socket.on("unequip_weapon", (itemid) => {
                con.query("SELECT type FROM items WHERE id = ?", itemid, function(error, results, fields){
                    if(error) throw error;
                    if(results[0].type == 5){
                    con.query("SELECT id FROM characters WHERE name = ?", socket.username, function(error, results, fields) {
                        if (error) throw error;
                        console.log(results[0].id);
                        console.log(results[0].id + " " + itemid);
                        con.query("SELECT * FROM characters_inventorys WHERE characterid = ? AND itemid = ?", [results[0].id, itemid], function(error, results2, fields) {
                            if (error) throw error;
                            console.log(results2.length);
                            if(results2.length > 0){
                                console.log(socket.username + " unequipped an weapon with the id " + itemid);
                                con.query("UPDATE characters SET equipped_weapon = ? WHERE id = ?", [-1, results[0].id], function(error, results, fields) {
                                    if (error) throw error;
                                });
                            }
                        })
                    })
                    }
                });
            })

            /* END OF EQUIPS */

            /* MARKETPLACE */
            socket.on("fetchMarketplaceItems", () => {
                con.query("SELECT id FROM characters WHERE name = ?", socket.username, (error, results, fields) => {
                    con.query("SELECT * FROM marketplace_listings WHERE sellerid NOT IN (?)", results[0].id, function(error2, results2, fields2) {
                        if(error2) throw error2;
                        results2.forEach(element => {
                            con.query("SELECT * FROM items WHERE id = ?", element.itemid, (error3, results3, fields) => {
                                if(error3) throw error3;
                                io.to(socket.id).emit("receiveMarketplaceItem", element.id, element.itemid, results3[0].icon, results3[0].name, results3[0].description, results3[0].rarity, element.buyoutprice, element.sellerid);
                            })
                        });
                    })
                })
            })

            socket.on("buyMarketplaceItem", (listingID) => {
                con.query("SELECT * FROM marketplace_listings WHERE id = ?", listingID, (error, results, fields) => {
                    if(error) throw error;
                    if(results.length > 0){ // If listing was found
                        con.query("SELECT id FROM characters WHERE name = ?", socket.username, (error2, results2, fields2) => {
                            if(error2) throw error2;
                            con.query("SELECT money FROM characters WHERE id = ?", results2[0].id, (error3, results3, fields3) => {
                                if(error3) throw error3;
                                if(results3[0].money >= results[0].buyoutprice){
                                    con.query("DELETE FROM marketplace_listings WHERE id = ?", listingID, (error5, results5, fields5) => {
                                        if(error5) throw error5;
                                        con.query("INSERT INTO characters_inventorys (id, characterid, itemid) VALUES (NULL, ?, ?)", [results2[0].id, results[0].itemid], (error4, results4, fields4) => {
                                            if(error4) throw error4;
                                            con.query("UPDATE characters SET money = ? WHERE id = ?", [(results3[0].money - results[0].buyoutprice), results2[0].id], (error5, results5, fields5) => { // Buyer reduce money
                                                if(error5) throw error5;

                                                con.query("SELECT money FROM characters WHERE id = ?", results[0].sellerid, (error6, results6, fields6) => {
                                                    if(error6) throw error6
                                                    con.query("UPDATE characters SET money = ? WHERE id = ?", [(results6[0].money + results[0].buyoutprice), results[0].sellerid], (error7, results7, fields7) => { // Seller Give money
                                                        if(error7) throw error7;
                                                        io.to(socket.id).emit("sendAlert", "Item buyed successfully!");
                                                        con.query("SELECT * FROM items WHERE id = ?", results[0].itemid, (error8, results8, fields8) => {
                                                            if(error8) throw error8;
                                                            var color;
                                                            if(results8[0].rarity == "Poor"){
                                                                color = "#9d9d9d";
                                                            } else
                                                            if(results8[0].rarity == "Common"){
                                                                color = "#ffffff";
                                                            } else
                                                            if(results8[0].rarity == "Uncommon"){
                                                                color = "#1eff00";
                                                            } else
                                                            if(results8[0].rarity == "Rare"){
                                                                color = "#0070dd";
                                                            } else
                                                            if(results8[0].rarity == "Epic"){
                                                                color = "#a335ee";
                                                            } else
                                                            if(results8[0].rarity == "Legendary"){
                                                                color = "#ff8000";
                                                            } else
                                                            if(results8[0].rarity == "Artifact"){
                                                                color = "#e6cc80";
                                                            } else {
                                                                color = "#9d9d9d";
                                                            }
                                                            io.to(socket.id).emit("receiveMessageRequest", "Bought <span style='color:" + color + "'> " + results8[0].name + "</span> from the marketplace for <span style='color:yellow'> " + results[0].buyoutprice + "</span> Gold");
                                                        })
                                                    })
                                                })
                                            })

                                        })
                                    });
                                } else {
                                    io.to(socket.id).emit("sendAlert", "Not enough money to buy the listing!");
                                }
                            })
                        })
                        
                    }
                })
            })

            socket.on("requestPlayerMoney", () => {
                con.query("SELECT money FROM characters WHERE name = ?", socket.username, (error, results, fields) => {
                    io.to(socket.id).emit("receivePlayerMoney", results[0].money);
                })
            })
            /* END OF MARKETPLACE */
            /* INBOX */
            socket.on("fetchInboxMessages", () => {
                con.query("SELECT id FROM characters WHERE name = ?", socket.username, (error, results, fields) => {
                    if(error) throw error;
                    con.query("SELECT * FROM inbox_messages WHERE characterid = ? ORDER BY timestamp DESC", results[0].id, (error2, results2, fields2) => {
                        if(error2) throw error2;
                        results2.forEach(message => {
                            io.to(socket.id).emit("receiveInboxMessage", message.id, message.message, message.timestamp);
                        });
                    })
                })
            })

            socket.on("createNewInboxMessage", (message) => {
                con.query("SELECT id FROM characters WHERE name = ?", socket.username, (error, results, fields) => {
                    if(error) throw error;
                    con.query("INSERT INTO inbox_messages (id, characterid, message, timestamp) VALUES (NULL, ?, ?, '" + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + "')", [results[0].id, message], (error2, results2, fields2) => {
                        if(error2) throw error2;
                    })
                })
            })
            /* END OF INBOX */


            socket.on("fetchItems", () => { // HIER ALS LETZTES STEHENGEBLIEBEN 18.02.2022 -> Die Items wurden immer weiter *2 genommen auf der Charakter Seite und dann sind da irgendwann tausende Objekte

                console.log(socket.dbID);

                con.query('SELECT * FROM characters_inventorys WHERE characterid = ?', socket.dbID, function(error, results1, fields) {
                    if (error) throw error;
                    var itemIDs = [];
                    
                    if(results1.length > 0){
                        console.log(results1);
                        
                        for (var i = 0; i < results1.length; i++){
                            itemIDs.push(results1[i].itemid);
                        }
                        
                        //var items = [];
                        itemIDs.forEach(itemid => {
                            
                            
                            con.query("SELECT * FROM items WHERE id = ?", itemid, function(error, results, fields) {
                                if (error) throw error;
                                con.query("SELECT equipped_head, equipped_chest, equipped_leg, equipped_hand, equipped_boot, equipped_weapon FROM characters WHERE id = ?", socket.dbID, function(error2, results2, fields2) {

                                    var gotEquipped = false;
                                    if(results2[0].equipped_head == results[0].id){
                                        gotEquipped = true;
                                    }
                                    if(results2[0].equipped_chest == results[0].id){
                                        gotEquipped = true;
                                    }
                                    if(results2[0].equipped_leg == results[0].id){
                                        gotEquipped = true;
                                    }
                                    if(results2[0].equipped_hand == results[0].id){
                                        gotEquipped = true;
                                    }
                                    if(results2[0].equipped_boot == results[0].id){
                                        gotEquipped = true;
                                    }
                                    if(results2[0].equipped_weapon == results[0].id){
                                        gotEquipped = true;
                                    }
                                
                                io.to(socket.id).emit("receiveItem", results[0].id, results[0].name, results[0].type, results[0].description, results[0].sellprice, results[0].buyprice, results[0].soulbound, results[0].isWeapon, results[0].bonus_damage, results[0].bonus_health, results[0].bonus_defense, results[0].requiredlevel, results[0].icon, results[0].rarity, gotEquipped);
                                //items.push(item);
                                })
                            })
                            
                            
                            
                        });

                        io.to(socket.id).emit("createInventory");
                        
                        //io.to(socket.id).emit("receiveItems", items);
                        
                        
                        
                    } else {
                        console.log("No items found for " + socket.id);
                    }
                    
                })
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

            // statement to query the user’s password
            var statement = "select code from characters where name = ?";
            var values = [username]; // query values

            // function to log in
            function hasAccess(result){
            if (result) {
                // insert login code here
                console.log("Access Granted!");
                                            
                // Execute SQL query that'll select the account from the database based on the specified username and password
                // Authenticate the user
                request.session.loggedin = true;
                request.session.username = username;
                // Redirect to home page
                response.redirect('/game');		
                response.end();
            }
            else {
                // insert access denied code here
                console.log("Access Denied!");
                response.send('Incorrect Username and/or Password!');
            }
            }

            // query database for user's password
            con.query(statement, values, function(err, res) {
            if (err) throw err;
            else {
                var hash = res[0].code;
                // compare hash and password
                bcrypt.compare(password, hash, function(err, result) {
                // execute code to test for access and login
                hasAccess(result);
                });
            }
            });
        });

        ServerApp.get('/game', function(request, response) {
            // If the user is loggedin
            if (request.session.loggedin) {
                // Output username
                console.log("true");
                response.render(__dirname + "/game/game/index.html");

                let username = request.session.username;
                

                io.sockets.on('connection', (socket) => {
                    socket.username = username;
                    
                });
            } else {
                // Not logged in
                response.redirect('../');
                console.log("false");
            }
            response.end();
        });

        ServerApp.get('/inventory', function(request, response) {
            console.log("Works?");
            // If the user is loggedin
            if (request.session.loggedin) {
                // Output username
                console.log("true");
                response.render(__dirname + "/game/inventory/index.html");

                let username = request.session.username;
                

                io.sockets.on('connection', (socket) => {
                    socket.username = username;
                    
                });
            } else {
                // Not logged in
                response.redirect('../');
                console.log("false");
            }
            response.end();
        });

        //ServerApp.get('*', function (req, res) {
        //    console.log(__dirname);
        //})

        ServerApp.get('/marketplace', function(request, response) {
            // If the user is loggedin
            if (request.session.loggedin) {
                // Output username
                console.log("true");
                response.render(__dirname + "/game/marketplace/index.html");

                let username = request.session.username;
                

                io.sockets.on('connection', (socket) => {
                    socket.username = username;
                    
                });
            } else {
                // Not logged in
                response.redirect('../');
                console.log("false");
            }
            response.end();
        });

        ServerApp.get('/inbox', function(request, response) {
            // If the user is loggedin
            if (request.session.loggedin) {
                // Output username
                console.log("true");
                response.render(__dirname + "/game/inbox/index.html");

                let username = request.session.username;
                

                io.sockets.on('connection', (socket) => {
                    socket.username = username;
                    
                });
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
  servers[0].start(config.mysqlServerAdress[0], config.mysqlUser[0], config.mysqlPassword[0], config.mysqlDatabaseName[0]);
  console.log(servers);
});

io.on('connection', (socket) => {
    io.to(socket.id).emit('loadServers', servers);
});