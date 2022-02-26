var socket = io.connect();
var itemRares = null;
var characterID = null;
var localItems = [];
var readyToRenderItems = false;


// ----------------------------------------------------------------
// Item Class 
// ----------------------------------------------------------------
class Item {
    constructor(id, name, type, description, sellprice, buyprice, soulbound, isWeapon, bonus_damage, bonus_health, bonus_defense, requiredlevel, icon, rarity, equipped){
        this.id = id;
        this.name = name;
        this.type = type;
        this.description = description;
        this.sellprice = sellprice;
        this.buyprice = buyprice;
        this.soulbound = soulbound;
        this.isWeapon = isWeapon;
        this.bonus_damage = bonus_damage;
        this.bonus_health = bonus_health;
        this.bonus_defense = bonus_defense;
        this.requiredlevel = requiredlevel;
        this.icon = icon;
        this.rarity = rarity;
        this.equipped = equipped;
    }

    getItemID(){
        return this.id;
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

    getSoulBoundText(){
        if(this.soulbound == 0){
            return "Not Soulbound";
        } else {
            return "Soulbound";
        }
    }

    getIsWeapon(){
        return this.isWeapon;
    }

    getIsWeaponText(){
        if(this.isWeapon == 0){
            return "Can't be used as a weapon";
        } else {
            return "Can be used as a weapon";
        }
    }

    getDamage(){
        return this.bonus_damage;
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

    getEquipped(){
        return this.equipped;
    }

}

function getAccountItems(){
    socket.emit("fetchItems");
}

socket.on("createInventory", () => {
    
    readyToRenderItems = true;

})

socket.on("receiveItem", (id, name, type, description, sellprice, buyprice, soulbound, isWeapon, bonus_damage, bonus_health, bonus_defense, requiredlevel, icon, rarity, equipped) => {
    // Create new item
    var newItem = new Item(id, name, type, description, sellprice, buyprice, soulbound, isWeapon, bonus_damage, bonus_health, bonus_defense, requiredlevel, icon, rarity, equipped);

    // Push the new item into the local localItems variable
    pushLocalItems(newItem);
})

function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    console.log("Works!");
  }
  
  function drop(ev) {
    var returnDiv = document.getElementById("inventoryGrid");
    
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    console.log(ev.target);
    if(ev.target.className == "slot1" && ev.target.children.length == 0){
        console.log("Head");
        ev.target.appendChild(document.getElementById(data));
        if(localItems[ev.target.firstChild.id].getType() == 0){
            console.log(localItems[ev.target.firstChild.id].getItemID());
            socket.emit("equip_head", localItems[ev.target.firstChild.id].getItemID());
        } else {
            alert("Item is not of Type Head");
            returnDiv.appendChild(document.getElementById(data));
        }
    }
    if(ev.target.className == "slot2" && ev.target.children.length == 0){
        console.log("Chest");
        ev.target.appendChild(document.getElementById(data));
        if(localItems[ev.target.firstChild.id].getType() == 1){
            console.log(localItems[ev.target.firstChild.id].getItemID());
            socket.emit("equip_chest", localItems[ev.target.firstChild.id].getItemID());
        } else {
            alert("Item is not of Type Chest");
            returnDiv.appendChild(document.getElementById(data));
        }
    }
    if(ev.target.className == "slot3" && ev.target.children.length == 0){
        console.log("Leg");
        ev.target.appendChild(document.getElementById(data));
        if(localItems[ev.target.firstChild.id].getType() == 2){
            console.log(localItems[ev.target.firstChild.id].getItemID());
            socket.emit("equip_leg", localItems[ev.target.firstChild.id].getItemID());
        } else {
            alert("Item is not of Type Legs");
            returnDiv.appendChild(document.getElementById(data));
        }
    }
    if(ev.target.className == "slot4" && ev.target.children.length == 0){
        console.log("Hands");
        ev.target.appendChild(document.getElementById(data));
        if(localItems[ev.target.firstChild.id].getType() == 3){
            console.log(localItems[ev.target.firstChild.id].getItemID());
            socket.emit("equip_hand", localItems[ev.target.firstChild.id].getItemID());
        } else {
            alert("Item is not of Type Hands");
            returnDiv.appendChild(document.getElementById(data));
        }
    }
    if(ev.target.className == "slot5" && ev.target.children.length == 0){
        console.log("Boots");
        ev.target.appendChild(document.getElementById(data));
        if(localItems[ev.target.firstChild.id].getType() == 4){
            console.log(localItems[ev.target.firstChild.id].getItemID());
            socket.emit("equip_boot", localItems[ev.target.firstChild.id].getItemID());
        } else {
            alert("Item is not of Type Boots");
            returnDiv.appendChild(document.getElementById(data));
        }
    }
    if(ev.target.className == "slot6" && ev.target.children.length == 0){
        console.log("Weapon");
        ev.target.appendChild(document.getElementById(data));
        if(localItems[ev.target.firstChild.id].getType() == 5){
            console.log(localItems[ev.target.firstChild.id].getItemID());
            socket.emit("equip_weapon", localItems[ev.target.firstChild.id].getItemID());
        } else {
            alert("Item is not of Type Weapon");
            returnDiv.appendChild(document.getElementById(data));
        }
    }
    if(ev.target.className == "inventoryGrid"){
        ev.target.appendChild(document.getElementById(data));
        console.log(localItems[ev.target.lastChild.id].getItemID());
        if(localItems[ev.target.lastChild.id].getType() == 0){
            socket.emit("unequip_head", localItems[ev.target.lastChild.id].getItemID());
        }
        if(localItems[ev.target.lastChild.id].getType() == 1){
            socket.emit("unequip_chest", localItems[ev.target.lastChild.id].getItemID());
        }
        if(localItems[ev.target.lastChild.id].getType() == 2){
            socket.emit("unequip_leg", localItems[ev.target.lastChild.id].getItemID());
        }
        if(localItems[ev.target.lastChild.id].getType() == 3){
            socket.emit("unequip_hand", localItems[ev.target.lastChild.id].getItemID());
        }
        if(localItems[ev.target.lastChild.id].getType() == 4){
            socket.emit("unequip_boot", localItems[ev.target.lastChild.id].getItemID());
        }
        if(localItems[ev.target.lastChild.id].getType() == 5){
            socket.emit("unequip_weapon", localItems[ev.target.lastChild.id].getItemID());
        }
    }
}

function pushLocalItems(item){
    localItems.push(item);
    console.log(localItems);

    if(readyToRenderItems){
        var inventory = document.getElementById("inventoryGrid");
        var itemTemplate = document.getElementsByClassName("inventory-item")[0];
        var clone = itemTemplate.cloneNode(true);

        /* Equipment Slots */
        var headSlot = document.getElementById("slot1");
        var chestSlot = document.getElementById("slot2");
        var legSlot = document.getElementById("slot3");
        var handSlot = document.getElementById("slot4");
        var bootSlot = document.getElementById("slot5");
        var weaponSlot = document.getElementById("slot6");
        
        var itemDescription;
        var itemIsWeapon;
        var itemSoulbound;

        console.log(localItems);
        console.log("Items fetched");

        for(var i = 0; i < localItems.length; i++){
            console.log(localItems[i].getName());
            clone.style.display = null;
            clone.id = i;

            if(localItems[i].getEquipped()){
                if(localItems[i].getType() == 0){
                    if(headSlot.children.length < 1){
                        headSlot.appendChild(clone);
                    }
                }
                if(localItems[i].getType() == 1){
                    if(chestSlot.children.length < 1){
                        chestSlot.appendChild(clone);
                    }
                }
                if(localItems[i].getType() == 2){
                    if(legSlot.children.length < 1){
                        legSlot.appendChild(clone);
                    }
                }
                if(localItems[i].getType() == 3){
                    if(handSlot.children.length < 1){
                        handSlot.appendChild(clone);
                    }
                }
                if(localItems[i].getType() == 4){
                    if(bootSlot.children.length < 1){
                        bootSlot.appendChild(clone);
                    }
                }
                if(localItems[i].getType() == 5){
                    if(weaponSlot.children.length < 1){
                        weaponSlot.appendChild(clone);
                    }
                }
            } else {
                inventory.appendChild(clone);
            }

            var itemText = document.getElementById(i).getElementsByClassName("inventory-item-name")[0];
            itemText.innerHTML = localItems[i].getName();
            itemText.style.color = localItems[i].getQualityColor();

            var itemIcon = document.getElementById(i).getElementsByClassName("inventory-item-icon")[0];
            itemIcon.src = localItems[i].getIcon();

            // Declaring Item Informations for the Modal
            itemDescription = localItems[i].getDescription();
            itemIsWeapon = localItems[i].getIsWeaponText();
            itemSoulbound = localItems[i].getSoulBoundText();

            socket.emit("checkIfItemIsEquipped", localItems[i].getItemID(), i);
            console.log(localItems[i].getItemID());
        }

        clone.addEventListener("click", function() {
            console.log("Works for: " + clone.getElementsByClassName("inventory-item-name")[0].innerHTML);
            // Get the modal
            var modal = document.getElementById("myModal");

            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close")[0];

            // When the user clicks on the button, open the modal
            modal.style.display = "block";

            // When the user clicks on <span> (x), close the modal
            span.onclick = function() {
            modal.style.display = "none";
            }

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
            }

            // Receive Item Informations
            var modalItemHeaderText = document.getElementById("modal-item-name");
            var modalItemImage = document.getElementById("modal-item-icon");
            var modalItemDescriptionText = document.getElementById("modal-item-description");
            var modalItemInformationSoulbound = document.getElementById("modal-item-information-soulbound");
            var modalitemInformationIsWeapon = document.getElementById("modal-item-information-isWeapon");

            modalItemHeaderText.innerHTML = clone.getElementsByClassName("inventory-item-name")[0].innerHTML;
            modalItemHeaderText.style.color = clone.getElementsByClassName("inventory-item-name")[0].style.color;

            modalItemImage.src = clone.getElementsByClassName("inventory-item-icon")[0].src;

            modalItemDescriptionText.innerHTML = itemDescription;
            modalItemInformationSoulbound.innerHTML = itemIsWeapon;
            modalitemInformationIsWeapon.innerHTML = itemSoulbound;

        });

        clone.draggable = true;
        clone.ondragstart = function(){drag(event); };
    }
}

// Join Game call to Server
socket.emit("joinedGame");

// Verification for the Server Room
socket.on("RoomsVerification", (param) => {console.log(param)});

// Setting all the Elements with the Data from the Database
socket.on("loginVerification", (characterId, characterName, characterLevel, characterClass, characterPortrait, characterAttackpower, characterHealth, characterDefense, itemRarities) => {
    characterID = characterId;
    // Set fetched item Rarities
    itemRares = itemRarities;
    console.log("Works!");
    getAccountItems();
})



socket.on("sendAlert", (receivingMessage) => {
    alert(receivingMessage);
});