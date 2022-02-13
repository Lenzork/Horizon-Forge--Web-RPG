var socket = io();

socket.on("loginVerification", (message) => {var messageElement = document.getElementById("ResponseText");
messageElement.innerHTML = message;});