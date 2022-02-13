var socket = io();

socket.on("loginVerification", (message) => {var messageElement = document.getElementById("ResponseText");
messageElement.innerHTML = message;})

socket.on("checkLogin", () => {
    console.log("Test");})