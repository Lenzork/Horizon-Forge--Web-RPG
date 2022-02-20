var socket = io.connect();
var characterID = null;
var pvpRanks = [];
var titles = [];
var readyToRenderPVPRanks = false;
var readyToRenderTitle = false;
var localPlayer;

// ----------------------------------------------------------------
// Character Class 
// ----------------------------------------------------------------
class Character {
    constructor(characterId, characterName, characterLevel, characterClass, characterPortrait, characterAttackpower, characterHealth, characterDefense, characterPvpCR, title){
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

// ----------------------------------------------------------------
// Titles
// ----------------------------------------------------------------
class Title {
    constructor(id, title){
        this.id = id;
        this.title = title;
    }

    getTitle(){
        return this.title;
    }

    getTitleWithCharacterName(characterName, before){
        if(before){
            return this.title + " " + characterName
        }
        if(!before){
            return characterName + " " + this.title;
        }
    }
}

function pushTitles(item){
    titles.push(item);
}

socket.on("createNewPVPRank", (id, name, icon, mincr) => {
    var newRank = new PvpRank(id, name, icon, mincr);
    pushPVPRanks(newRank);

    if(readyToRenderPVPRanks){
        var characterPVPRankInfo = document.getElementById("PVPRankIcon");
        var characterPVPRankName = document.getElementById("PVPRankName");
        var characterPVPRankCRText = document.getElementById("PVPRankCR");

        characterPVPRankInfo.src = localPlayer.getCharacterPVPIcon();
        characterPVPRankName.innerHTML = localPlayer.getCharacterPVPRankName();
        characterPVPRankCRText.innerHTML = localPlayer.getCharacterPVPCR();

    }
});

socket.on("setReadyToRenderTitle", () => {
    readyToRenderTitle = true;
})

socket.on("receiveTitle", (id, title) => {
    var newTitle = new Title(id, title);

    pushTitles(newTitle);

    console.log(titles);
    if(readyToRenderTitle){
        var characterNameText = document.getElementById("characterName");

        characterNameText.innerHTML = localPlayer.getEquippedCharacterTitleText();
    }
})

// Join Game call to Server
socket.emit("joinedGame");

// Verification for the Server Room
socket.on("RoomsVerification", (param) => {console.log(param)});

socket.emit("getPVPRanks");

socket.emit("getUserTitles");

socket.on("readyToRenderPVPRanks", () => {
    readyToRenderPVPRanks = true;
});

// Setting all the Elements with the Data from the Database
socket.on("loginVerification", (characterId, characterName, characterLevel, characterClass, characterPortrait, characterAttackpower, characterHealth, characterDefense, itemRarities, characterPvpCR, title) => {
    var playerCharacter = new Character(characterId, characterName, characterLevel, characterClass, characterPortrait, characterAttackpower, characterHealth, characterDefense, characterPvpCR, title)
    
    localPlayer = playerCharacter;

    var characterNameText = document.getElementById("characterName");
    var characterPortraitImg = document.getElementById("characterPortrait");
    var characterStrengthValueText = document.getElementById("characterStrengthValue");
    var characterHealthValueText = document.getElementById("characterHealthValue");
    var characterDefenseValueText = document.getElementById("characterDefenseValue");
    var characterInfoText = document.getElementById("character-Class-Level");

    characterID = characterId;

    // Set the Element properties
    characterNameText.innerHTML = playerCharacter.characterName;
    characterInfoText.innerHTML =  playerCharacter.characterClass + " - Level " + playerCharacter.characterLevel;
    characterPortraitImg.src = "../images/portraits/" + playerCharacter.characterPortrait;
    characterStrengthValueText.innerHTML = playerCharacter.characterAttackpower;
    characterHealthValueText.innerHTML = playerCharacter.characterHealth;
    characterDefenseValueText.innerHTML = playerCharacter.characterDefense;

    console.log("Works!");
})



socket.on("getCharacterInformations", () => {
    console.log("Test");
})