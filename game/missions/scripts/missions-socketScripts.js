/* Initialize socket.io */
var socket = io.connect();

/* Local Client Arrays */
var localMarketplaceItems = [];

/* Classes */
class marketplaceItem {
    constructor(id, itemid, itemname, itemicon, itemDescription, itemRarity, buyoutprice, sellerid, element){
        this.id = id;
        this.itemid = itemid;
        this.itemname = itemname;
        this.itemDescription = itemDescription;
        this.itemRarity = itemRarity;
        this.buyoutprice = buyoutprice;
        this.sellerid = sellerid;
        this.itemicon = itemicon;
        this.element = element;
    }

    getRarity(){
        return this.itemRarity;
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

    initElement(){
        var marketplace = document.getElementById("marketplace-table");
        
        // Creating a new Table item
        this.element = document.createElement("tr");

        var c1 = document.createElement("td");
        var itemPicture = document.createElement("img");
        var itemName = document.createElement("p");

        var c2 = document.createElement("td");
        var itemBuyoutPrice = document.createElement("h4");

        var c3 = document.createElement("td");
        var itemBuyButton = document.createElement("button");

        // Setting properties of the items
        c1.style = "text-align: center;";
        c2.style = "text-align: center;";
        c3.style = "text-align: center;";

        itemPicture.src = this.itemicon;
        itemPicture.className = "marketplace-item-icon";
        itemName.innerHTML = this.itemname;
        itemName.className = "marketplace-item-name";
        itemName.style = "color: " + this.getQualityColor() + ";";

        itemBuyoutPrice.innerHTML = this.buyoutprice + ' <img src="../images/icons/things/3.png" style="max-width: 10px; max-height: 10px;">';
        itemBuyoutPrice.className = "marketplace-item-buyout-price";

        itemBuyButton.innerHTML = "Buy Item";
        itemBuyButton.id = this.id;

        //Adding the elements to the C's
        c1.appendChild(itemPicture);
        c1.appendChild(itemName);

        c2.appendChild(itemBuyoutPrice);

        c3.appendChild (itemBuyButton);

        // Adding every of the elements to the main element
        this.element.appendChild(c1);
        this.element.appendChild(c2);
        this.element.appendChild(c3);

        this.element.id = this.id;
    
        marketplace.appendChild(this.element);

        var itemDescriptionText = this.itemDescription;

        c1.addEventListener("click", openModal);

        function openModal() {
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

            modalItemHeaderText.innerHTML = itemName.innerHTML;
            modalItemHeaderText.style.color = itemName.style.color;

            modalItemImage.src = itemPicture.src;

            modalItemDescriptionText.innerHTML = itemDescriptionText;

        }

        itemBuyButton.addEventListener("click", function(){
            console.log("LocalPlayer tried to buy a item " + this.id);
            socket.emit("buyMarketplaceItem", this.id);
        })

        this.element.style.display = null;
    }

}

/* Socket Communications */
socket.emit("fetchMarketplaceItems"); // Request items from the server
socket.emit("requestPlayerMoney");

socket.on("receivePlayerMoney", (amount) => {
    var playerGoldText = document.getElementById("playerMoney");
    playerGoldText.innerHTML = 'Your Money: ' + amount + ' <img src="../images/icons/things/3.png" style="max-width: 13px; max-height: 13px;">';
})

socket.on("receiveMarketplaceItem", (id, itemid, itemicon, itemname, itemDescription, itemRarity, buyoutprice, sellerid) => { // Receiving an Answer from the Server
    var newItem = new marketplaceItem(id, itemid, itemname, itemicon, itemDescription, itemRarity, buyoutprice, sellerid);
    localMarketplaceItems.push(newItem);
    console.log(localMarketplaceItems);
    newItem.initElement();
})

socket.on("receiveMessageRequest", (message) => {
    socket.emit("createNewInboxMessage", message);
})

socket.on("sendAlert", (receivingMessage) => {
    alert(receivingMessage);
});