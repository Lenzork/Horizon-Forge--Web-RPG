/* Initialize socket.io */
var socket = io.connect();

/* Local Client Arrays */
var localMarketplaceItems = [];

/* Classes */
class marketplaceItem {
    constructor(id, itemid, itemname, itemicon, itemDescription, buyoutprice, sellerid, element){
        this.id = id;
        this.itemid = itemid;
        this.itemname = itemname;
        this.itemDescription = itemDescription;
        this.buyoutprice = buyoutprice;
        this.sellerid = sellerid;
        this.itemicon = itemicon;
        this.element = element;
    }

    initElement(){
        var marketplace = document.getElementById("marketplaceGrid");
        var itemTemplate = document.getElementsByClassName("marketplace-item")[0];
        this.element = itemTemplate.cloneNode(true);

        this.element.id = this.id;
    
        marketplace.appendChild(this.element);
    
        var itemText = this.element.getElementsByClassName("marketplace-item-name")[0];
        itemText.innerHTML = this.itemname;
    
        var itemIcon = this.element.getElementsByClassName("marketplace-item-icon")[0];
        itemIcon.src = this.itemicon;

        var itemBuyoutPriceText = this.element.getElementsByClassName("marketplace-item-buyout-price")[0];
        itemBuyoutPriceText.innerHTML = this.buyoutprice + ' <img src="../images/icons/things/3.png" style="max-width: 10px; max-height: 10px;">';

        var itemDescriptionText = this.itemDescription;

        this.element.addEventListener("click", function() {
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

            modalItemHeaderText.innerHTML = itemText.innerHTML;
            modalItemHeaderText.style.color = itemText.style.color;

            modalItemImage.src = itemIcon.src;

            modalItemDescriptionText.innerHTML = itemDescriptionText;

        });

        this.element.style.display = null;
    }

}

/* Socket Communications */
socket.emit("fetchMarketplaceItems");

socket.on("receiveMarketplaceItem", (id, itemid, itemicon, itemname, itemDescription, buyoutprice, sellerid) => {
    
    
    var newItem = new marketplaceItem(id, itemid, itemname, itemicon, itemDescription, buyoutprice, sellerid);
    localMarketplaceItems.push(newItem);
    console.log(localMarketplaceItems);
    newItem.initElement();
})