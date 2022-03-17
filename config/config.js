var config = {};

// ----------------------------------------------------------------
//                          SERVER CONFIG
// ----------------------------------------------------------------
config.mainServerPort = 3000;
config.serverCount = 4;
config.serverNames = ["Antropa", "Sinesta", "Landro", "Valis", "Valhalla"];
config.serverPorts = [8888, 8889, 8890, 8891, 8892];
config.serverSlots = [100, 80, 30, 100, 1000];
config.startAllServersAtTheBeginning = false;

// ----------------------------------------------------------------
//                          DATABASE CONFIG
// ----------------------------------------------------------------
config.mysqlServerAdress = [];
config.mysqlUser = [];
config.mysqlPassword = [];
config.mysqlDatabaseName = [];

// Database IP Adresses
config.mysqlServerAdress[0] = "localhost"; // Antropa
config.mysqlServerAdress[1] = "localhost"; // Sinesta
config.mysqlServerAdress[2] = "localhost"; // Landro
config.mysqlServerAdress[3] = "localhost"; // Valis
config.mysqlServerAdress[4] = "localhost"; // Valhalla

// Database User
config.mysqlUser[0] = "root"; // Antropa
config.mysqlUser[1] = "root"; // Sinesta
config.mysqlUser[2] = "root"; // Landro
config.mysqlUser[3] = "root"; // Valis
config.mysqlUser[4] = "root"; // Valhalla

// Database Passwords
config.mysqlPassword[0] = "root"; // Antropa
config.mysqlPassword[1] = null; // Sinesta
config.mysqlPassword[2] = null; // Landro
config.mysqlPassword[3] = null; // Valis
config.mysqlPassword[4] = null; // Valhalla

// Database Name
config.mysqlDatabaseName[0] = config.serverNames[0]; // Antropa
config.mysqlDatabaseName[1] = config.serverNames[1]; // Sinesta
config.mysqlDatabaseName[2] = config.serverNames[2]; // Landro
config.mysqlDatabaseName[3] = config.serverNames[3]; // Valis
config.mysqlDatabaseName[4] = config.serverNames[4]; // Valhalla

// ----------------------------------------------------------------
//                   CHARACTER CREATION CONFIG
// ----------------------------------------------------------------
config.startingAttackPower = 100;
config.startingHealth = 100;
config.startingDefense = 100;

module.exports = config;