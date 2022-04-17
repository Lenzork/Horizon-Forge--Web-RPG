/* Initialize socket.io */
var socket = io.connect();

socket.on("receiveMessageRequest", (message) => {
    socket.emit("createNewInboxMessage", message);
})

socket.on("sendAlert", (receivingMessage) => {
    alert(receivingMessage);
});