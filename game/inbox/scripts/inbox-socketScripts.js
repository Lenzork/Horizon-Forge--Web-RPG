/* Initialize socket.io */
var socket = io.connect();

/* Local Client Arrays */
var localInboxMessages = [];

/* Classes */
class InboxMessage {
    constructor(id, message, timestamp){
        this.id = id;
        this.message = message;
        this.timestamp = timestamp;
    }

    initElement(){
        var inbox = document.getElementById("inboxGrid");
        var itemTemplate = document.getElementsByClassName("inbox-item")[0];
        var clone = itemTemplate.cloneNode(true);

        clone.style = null;
        clone.getElementsByClassName("inbox-item-message")[0].innerHTML = this.message;

        clone.getElementsByClassName("inbox-item-timestamp")[0].innerHTML = new Date(this.timestamp).toISOString().replace(/T/, ' ').replace(/\..+/, '');

        inbox.appendChild(clone);
    }

}

/* Socket Communications */
socket.emit("fetchInboxMessages"); // Request items from the server

socket.on("receiveInboxMessage", (id, message, timestamp) => { // Receiving an Answer from the Server
    var newMessage = new InboxMessage(id, message, timestamp);
    localInboxMessages.push(newMessage);
    console.log(localInboxMessages);
    newMessage.initElement();
})

socket.on("sendAlert", (receivingMessage) => {
    alert(receivingMessage);
});