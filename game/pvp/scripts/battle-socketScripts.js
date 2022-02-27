/* Make a socket connection */
var socket = io.connect();
var PVPMatchID;
var characters = [];
var onTurn = 0;

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
        
        this.characterRealStrength;
        this.characterRealHealth;
        this.characterRealMaxHealth;
        this.characterRealDefense;
    }

    doDamage(value, target){
        target.receiveDamage(value);
    }

    receiveDamage(value){
        var damageAfterBlock = value * ( 1 / this.getCharacterRealDefense())
        this.characterRealHealth = Math.round(this.characterRealHealth - damageAfterBlock);
    }

    getCharacterRealStrength(){
        return this.characterRealStrength;
    }

    getCharacterRealHealth(){
        return this.characterRealHealth;
    }

    getCharacterRealMaxHealth(){
        return this.characterRealMaxHealth;
    }

    getCharacterRealDefense(){
        return this.characterRealDefense;
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
        this.characterRealStrength = (this.characterAttackpower + this.getEquippedItemsStrengthValue());
    }

    updateHealthText(){
        this.characterRealHealth = (this.characterHealth + this.getEquippedItemsHealthValue());
        this.characterRealMaxHealth = (this.characterHealth + this.getEquippedItemsHealthValue());
    }

    updateDefenseText(){
        this.characterRealDefense = (this.characterDefense + this.getEquippedItemsDefenseValue());
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
        if(characters[0] == this){
            this.equippedItems.forEach(item => {
                if(item != -1){
                    socket.emit("getBattleItemsP1", PVPMatchID, item);
                    console.log(item);
                }
            });
        } else if(characters[1] == this){
            this.equippedItems.forEach(item => {
                if(item != -1){
                    socket.emit("getBattleItemsP2", PVPMatchID, item);
                    console.log(item);
                }
            });
        }
    }
}

socket.emit("joinedTheBattle");

socket.on("matchStart", (matchID, p1ID, p2ID, p1Name, p2Name, p1Level, p2Level, p1Class, p2Class, p1Portrait, p2Portrait, p1Attackpower, p2Attackpower, p1Health, p2Health, p1Defense, p2Defense, p1PVPCR, p2PVPCR, p1Title, p2Title, equippedItemsP1, equippedItemsP2) => {
    PVPMatchID = matchID;

    var player1Character = new Character(p1ID, p1Name, p1Level, p1Class, p1Portrait, p1Attackpower, p1Health, p1Defense, p1PVPCR, p1Title, equippedItemsP1);
    var player2Character = new Character(p2ID, p2Name, p2Level, p2Class, p2Portrait, p2Attackpower, p2Health, p2Defense, p2PVPCR, p2Title, equippedItemsP2);

    console.log(player1Character);
    console.log(player2Character);

    var P1Name = document.getElementById("p1Name");
    var P2Name = document.getElementById("p2Name");

    P1Name.innerHTML = player1Character.getCharacterName();
    P2Name.innerHTML = player2Character.getCharacterName();

    var p1PortraitImage = document.getElementById("p1Portrait");
    p1PortraitImage.src = "../images/portraits/" + player1Character.getCharacterPortrait();

    var p2PortraitImage = document.getElementById("p2Portrait");
    p2PortraitImage.src = "../images/portraits/" + player2Character.getCharacterPortrait();

    characters.push(player1Character, player2Character);

    player1Character.getCharacterStrength();
    player2Character.getCharacterStrength();

})

socket.on("receiveP1Portrait", (portrait) => {
    
})

socket.on("receiveP2Portrait", (portrait) => {
    
})

socket.on("receiveP1Health", (value) => {
    var P1HealthText = document.getElementById("p1HealthText");
})

socket.on("receiveP2Health", (value) => {
    var P2HealthText = document.getElementById("p2HealthText");

})

// Item sockets
socket.on("receiveItemStrengthValueP1", (value) => {
    characters[0].addEquippedItemsStrengthValue(value);
    
})

socket.on("receiveItemHealthValueP1", (value) => {
    characters[0].addEquippedItemsHealthValue(value);
})

socket.on("receiveItemDefenseValueP1", (value) => {
    characters[0].addEquippedItemsDefenseValue(value);
})

socket.on("receiveItemStrengthValueP2", (value) => {
    characters[1].addEquippedItemsStrengthValue(value);
    
})

socket.on("receiveItemHealthValueP2", (value) => {
    characters[1].addEquippedItemsHealthValue(value);
})

socket.on("receiveItemDefenseValueP2", (value) => {
    characters[1].addEquippedItemsDefenseValue(value);
})

setInterval(()=>{
    var P1HealthText = document.getElementById("p1HealthText");
    P1HealthText.innerHTML = characters[0].getCharacterRealHealth() + " / " + characters[0].getCharacterRealMaxHealth();

    var P2HealthText = document.getElementById("p2HealthText");
    P2HealthText.innerHTML = characters[1].getCharacterRealHealth() + " / " + characters[1].getCharacterRealMaxHealth();

    var P1Healthbar = document.getElementById("p1HealthBar");
    P1Healthbar.value = (characters[0].getCharacterRealHealth() / characters[0].getCharacterRealMaxHealth());

    var P2Healthbar = document.getElementById("p2HealthBar");
    P2Healthbar.value = (characters[1].getCharacterRealHealth() / characters[1].getCharacterRealMaxHealth());


    if(characters[0].getCharacterRealHealth() >= 1 && characters[1].getCharacterRealHealth() >= 1){
        console.log("Läuft noch!");
        if(onTurn == 0){
            characters[0].doDamage(characters[0].getCharacterRealStrength(), characters[1]);
            onTurn = 1;
        } else if(onTurn == 1){
            characters[0].doDamage(characters[1].getCharacterRealStrength(), characters[0]);
            onTurn = 0;
        }
        if(characters[0].getCharacterRealHealth() <= 0 || characters[1].getCharacterRealHealth() <= 0){
            console.log("Game over!");
        }
    } else {
        console.log("Game over!");
    }
},1500)
