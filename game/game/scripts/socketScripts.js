var socket = io.connect();

socket.emit("joinedGame");
socket.on("RoomsVerification", (param) => {console.log(param)});


socket.on("loginVerification", (characterName, characterPortrait) => {
    var characterNameText = document.getElementById("characterName");
    var characterPortraitImg = document.getElementById("characterPortrait");

    characterNameText.innerHTML = characterName;
    characterPortraitImg.src = "../images/portraits/" + characterPortrait;
    console.log("Works!");
})



socket.on("getCharacterInformations", () => {
    console.log("Test");})