var socket = io();
var playerConnectedServer;
var blacklistNames = [];

// Gets the connected Server on the Character creation page
socket.on("getConnectedServer", (connectedServer, mainServerPort, clientsCount, blacklistedNames) => {
    if(connectedServer.online){
        exports.currentServerText.innerHTML = connectedServer.name;
        playerConnectedServer = connectedServer;
        exports.currentServerUsers.innerHTML = clientsCount + " / " + connectedServer.slots;
        blacklistNames = blacklistedNames;
    } else {
        console.error("SERVER IS OFFLINE, REDIRECTING");
        var adresse = new URL("http://localhost:" + mainServerPort);
        window.location.replace(adresse);
    }
})

setInterval(() => {
    console.log("Receiving Server Informations...");
    socket.emit("receiveServer");
}, 1000);

// The Character creation function
characterCreateButton.addEventListener("click", function() {
    console.log("Sent!");
    var characterName = null;
    var characterClass = null;
    var characterServer = null;
    var blacklistedNameDetected = false;

    // Character name
    // Check for length
    // Pass if name length is shorter than 18
    if(exports.characterNameInput.value.length <= 18){
        characterName = exports.characterNameInput.value;
    } else {
        characterName = null;
        alert("Charactername is too long!");
    }
    // Pass if name length is longer than 4
    if(exports.characterNameInput.value.length >= 4){
        characterName = exports.characterNameInput.value;
    } else {
        characterName = null;
        alert("Charactername is too short!");
    }

    // Character Class
    if(exports.classWarriorRadioButton.checked){
        characterClass = "Warrior";
    }
    if(exports.classWizardRadioButton.checked){
        characterClass = "Wizard";
    }
    if(exports.classArcherRadioButton.checked){
        characterClass = "Archer";
    }

    characterServer = playerConnectedServer;

    // Check for Blacklisted Names
    blacklistNames.forEach((name) => {
            if(exports.characterNameInput.value.toLowerCase().includes(name)){
                console.log("Blacklisted name detected: " + name);
                blacklistedNameDetected = true;
                return;
            }
    })
    
    if((exports.characterNameInput.value.length <= 18 && exports.characterNameInput.value.length >= 4) && characterClass && characterServer && !blacklistedNameDetected){
        socket.emit("createCharacter", characterName, characterClass, characterServer.name);
    } else {
        alert("Character could not be created! Please select a class and enter a valid name!");
    }
});