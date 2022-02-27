/* Make a socket connection */
var socket = io.connect();

/* LOCAL VARIABLES */
var pvpRanks = [];
var readyToRenderPVPRanks = false;
var localPlayer;

/* CLASSES */
class Character {
    constructor(characterId, characterName, characterLevel, characterClass, characterPortrait, characterAttackpower, characterHealth, characterDefense, characterPvpCR, title, equippedItems){
        this.characterId = characterId;
        this.characterName = characterName;
        this.characterLevel = characterLevel;
        this.characterClass = characterClass;
        this.characterPortrait = characterPortrait;
        this.characterAttackpower = characterAttackpower;
        this.characterHealth = characterHealth;
        this.characterDefense = characterDefense;
        this.characterPvpCR = characterPvpCR;
        this.title = title;
        this.equippedItems = equippedItems;

        this.equippedItemsStrengthValue = [];
        this.equippedItemsHealthValue = [];
        this.equippedItemsDefenseValue = []
    }

    addEquippedItemsStrengthValue(value){
        this.equippedItemsStrengthValue.push(value);
        this.updateStrengthText();
    }

    addEquippedItemsHealthValue(value){
        this.equippedItemsHealthValue.push(value);
        this.updateHealthText();
    }

    addEquippedItemsDefenseValue(value){
        this.equippedItemsDefenseValue.push(value);
        this.updateDefenseText();
    }

    getEquippedItemsStrengthValue(){
        var value = 0;
        this.equippedItemsStrengthValue.forEach(element => {
            value = value + element;
        });
        return value;
    }

    getEquippedItemsHealthValue(){
        var value = 0;
        this.equippedItemsHealthValue.forEach(element => {
            value = value + element;
        });
        return value;
    }

    getEquippedItemsDefenseValue(){
        var value = 0;
        this.equippedItemsDefenseValue.forEach(element => {
            value = value + element;
        });
        return value;
    }

    updateStrengthText(){
        var characterStrengthValueText = document.getElementById("characterStrengthValue");
        characterStrengthValueText.innerHTML = (this.characterAttackpower + this.getEquippedItemsStrengthValue());
    }

    updateHealthText(){
        var characterHealthText = document.getElementById("characterHealthValue");
        characterHealthText.innerHTML = (this.characterHealth + this.getEquippedItemsHealthValue());
    }

    updateDefenseText(){
        var characterDefenseText = document.getElementById("characterDefenseValue");
        characterDefenseText.innerHTML = (this.characterDefense + this.getEquippedItemsDefenseValue());
    }

    getCharacterId(){
        return this.characterId;
    }
    
    getCharacterName(){
        return this.characterName;
    }

    getCharacterLevel(){
        return this.characterLevel;
    }

    getCharacterClass(){
        return this.characterClass
    }

    getCharacterPortrait(){
        return this.characterPortrait;
    }

    getCharacterAttackpower(){
        return this.characterAttackpower;
    }

    getCharacterHealth(){
        return this.characterHealth;
    }

    getCharacterDefense(){
        return this.characterDefense;
    }

    getCharacterPVPRank(){
        return this.characterPvpRank;
    }

    getCharacterPVPIcon(){
        return pvpRanks[this.doCharacterPVPAlgorithm()].getIcon();
    }

    getCharacterPVPRankName(){
        
        return pvpRanks[this.doCharacterPVPAlgorithm()].getName();
    }

    doCharacterPVPAlgorithm(){
        var currentCR = this.getCharacterPVPCR();
        var rank;
        pvpRanks.forEach((current) => {
            if(currentCR >= current.getMinCR()){
                rank = current.id;
            }
        })
        return rank;
    }
    
    getCharacterPVPCR(){
        return this.characterPvpCR;
    }

    getEquippedCharacterTitle(){
        return this.title;
    }

    getEquippedCharacterTitleText(){
        if(this.title != -1){
            return titles[this.getEquippedCharacterTitle()].getTitleWithCharacterName(this.characterName, true);
        }
        return this.getCharacterName();
    }

    getCharacterStrength(){
        this.equippedItems.forEach(item => {
            if(item != -1){
                socket.emit("getItem", item);
                console.log(item);
            }
        });
    }
}

// ----------------------------------------------------------------
// PVP Ranks
// ----------------------------------------------------------------
class PvpRank {
    constructor(id, name, icon, mincr){
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.mincr = mincr;
    }

    getID(){
        return this.id;
    }

    getName(){
        return this.name;
    }

    getIcon(){
        return this.icon;
    }

    getMinCR(){
        return this.mincr;
    }
}

function pushPVPRanks(item){
    pvpRanks.push(item);
}

/* SOCKETS */
socket.on("createNewPVPRank", (id, name, icon, mincr) => {
    var newRank = new PvpRank(id, name, icon, mincr);
    pushPVPRanks(newRank);

    if(readyToRenderPVPRanks){
        var characterPVPRankInfo = document.getElementById("PVPRankIcon");
        var characterPVPRankName = document.getElementById("PVPRankName");
        var characterPVPRankCRText = document.getElementById("PVPRankCR");

        characterPVPRankInfo.src = localPlayer.getCharacterPVPIcon();
        characterPVPRankName.innerHTML = localPlayer.getCharacterPVPRankName();
        characterPVPRankCRText.innerHTML = localPlayer.getCharacterPVPCR() + " CR";

    }
});

socket.on("readyToRenderPVPRanks", () => {
    readyToRenderPVPRanks = true;
});

socket.on("matchIsReady", () => {
    alert("MATCH IS READY!");
    window.location.replace("pvp/battlefield");
})

socket.on("loginVerification", (characterId, characterName, characterLevel, characterClass, characterPortrait, characterAttackpower, characterHealth, characterDefense, itemRarities, characterPvpCR, title, equippedItems) => {
    var playerCharacter = new Character(characterId, characterName, characterLevel, characterClass, characterPortrait, characterAttackpower, characterHealth, characterDefense, characterPvpCR, title, equippedItems)
    
    localPlayer = playerCharacter;


    localPlayer.getCharacterStrength();
    socket.emit("getPVPRanks");

    var joinQueueButton = document.getElementById("joinQueueButton");
    joinQueueButton.addEventListener("click", () => {
        console.log("Joining Queue...");
        socket.emit("joinPVPQueue");
    })
})

socket.on("getPVPQueueAmount", (amount) => {
    var PVPQueueAmountText = document.getElementById("peopleInQueueText");
    PVPQueueAmountText.innerHTML = "People in Queue: " + amount;
})
/* STARTING REQUESTS */


socket.emit("pvpHubJoin");
socket.emit("getPVPQueueAmount");