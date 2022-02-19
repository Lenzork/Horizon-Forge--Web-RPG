var socket = io.connect();
var itemRares = null;
var characterID = null;
var localItems = [];
var readyToRenderItems = false;

// ----------------------------------------------------------------
// Item Class 
// ----------------------------------------------------------------
class Item {
    constructor(name, type, description, sellprice, buyprice, soulbound, isWeapon, damage, requiredlevel, icon, rarity){
        this.name = name;
        this.type = type;
        this.description = description;
        this.sellprice = sellprice;
        this.buyprice = buyprice;
        this.soulbound = soulbound;
        this.isWeapon = isWeapon;
        this.damage = damage;
        this.requiredlevel = requiredlevel;
        this.icon = icon;
        this.rarity = rarity;
    }

    getName(){
        return this.name;
    }

    getType(){
        return this.type;
    }

    getTypeName(){
        return itemRares[this.type];
    }

    getDescription(){
        return this.description;
    }

    getSellPrice(){
        return this.sellprice;
    }

    getBuyPrice(){
        return this.buyprice;
    }

    getSoulBound(){
        return this.soulbound;
    }

    getIsWeapon(){
        return this.isWeapon;
    }

    getDamage(){
        return this.damage;
    }

    getRequiredLevel(){
        return this.requiredlevel;
    }

    getIcon(){
        return this.icon;
    }

    getRarity(){
        return this.rarity;
    }

    getQualityColor(){
        if(this.getRarity() == "Poor"){
            return "#9d9d9d";
        }
        if(this.getRarity() == "Common"){
            return "#ffffff";
        }
        if(this.getRarity() == "Uncommon"){
            return "#1eff00";
        }
        if(this.getRarity() == "Rare"){
            return "#0070dd";
        }
        if(this.getRarity() == "Epic"){
            return "#a335ee";
        }
        if(this.getRarity() == "Legendary"){
            return "#ff8000";
        }
        if(this.getRarity() == "Artifact"){
            return "#e6cc80";
        }
        return "#9d9d9d";
    }

}

function getAccountItems(){
    socket.emit("fetchItems");
}

socket.on("createInventory", () => {
    
    readyToRenderItems = true;

})

socket.on("receiveItem", (name, type, description, sellprice, buyprice, soulbound, isWeapon, damage, requiredlevel, icon, rarity) => {
    // Create new item
    var newItem = new Item(name, type, description, sellprice, buyprice, soulbound, isWeapon, damage, requiredlevel, icon, rarity);

    // Push the new item into the local localItems variable
    pushLocalItems(newItem);
})

function pushLocalItems(item){
    localItems.push(item);
    console.log(localItems);

    if(readyToRenderItems){
        var inventory = document.getElementById("inventoryGrid");
        var itemTemplate = document.getElementsByClassName("inventory-item")[0];
        var clone = itemTemplate.cloneNode(true);

        

        console.log(localItems);
        console.log("Items fetched");

        for(var i = 0; i < localItems.length; i++){
            console.log(localItems[i].getName());
            clone.style.display = null;
            clone.id = "inventory-item-" + i;
            inventory.appendChild(clone);

            var itemText = document.getElementById("inventory-item-" + i).getElementsByClassName("inventory-item-name")[0];
            itemText.innerHTML = localItems[i].getName();
            itemText.style.color = localItems[i].getQualityColor();

            var itemIcon = document.getElementById("inventory-item-" + i).getElementsByClassName("inventory-item-icon")[0];
            itemIcon.src = localItems[i].getIcon();
        }
    }
}

// Join Game call to Server
socket.emit("joinedGame");

// Verification for the Server Room
socket.on("RoomsVerification", (param) => {console.log(param)});

// Setting all the Elements with the Data from the Database
socket.on("loginVerification", (characterId, characterName, characterPortrait, characterAttackpower, characterHealth, characterDefense, itemRarities) => {
    var characterNameText = document.getElementById("characterName");
    var characterPortraitImg = document.getElementById("characterPortrait");
    var characterStrengthValueText = document.getElementById("characterStrengthValue");
    var characterHealthValueText = document.getElementById("characterHealthValue");
    var characterDefenseValueText = document.getElementById("characterDefenseValue");

    characterID = characterId;

    // Set fetched item Rarities
    itemRares = itemRarities;

    // Set the Element properties
    characterNameText.innerHTML = characterName;
    characterPortraitImg.src = "../images/portraits/" + characterPortrait;
    characterStrengthValueText.innerHTML = characterAttackpower;
    characterHealthValueText.innerHTML = characterHealth;
    characterDefenseValueText.innerHTML = characterDefense;

    getAccountItems();
    
    console.log("Works!");
})



socket.on("getCharacterInformations", () => {
    console.log("Test");})