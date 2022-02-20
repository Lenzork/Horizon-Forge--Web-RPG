/*

Simple Clientside Script for character creation Page
by Lenzork

written on 12/02/2022


*/
//----------------------------------------------------------------
// Declaration of elements
//----------------------------------------------------------------

//Player creation elements
characterNameText = document.getElementById("characterNameTop");
characterNameInput = document.getElementById("characterNameInput");
characterCodeInput = document.getElementById("characterCodeInput");
characterPicture = document.getElementById("characterPicture");
characterCreateButton = document.getElementById("characterCreationButton");

//Player classes radio Buttons
classWarriorRadioButton = document.getElementById("radio1");
classWizardRadioButton = document.getElementById("radio2");
classArcherRadioButton = document.getElementById("radio3");

//Server connection Informations
currentServerText = document.getElementById("serverConnection");
currentServerUsers = document.getElementById("serverUsers");

//----------------------------------------------------------------
// Functions
//----------------------------------------------------------------
characterNameInput.onkeydown, characterNameInput.onkeyup = () => {
    characterNameText.innerHTML = characterNameInput.value;
}

classArcherRadioButton.oninput = () => {
    console.log("Works!");
    if(classArcherRadioButton.checked){
        characterPicture.src = "../images/portraits/28.png";
    }
}

classWarriorRadioButton.oninput = () => {
    console.log("Works!");
    if(classWarriorRadioButton.checked){
        characterPicture.src = "../images/portraits/24.png";
    }
}

classWizardRadioButton.oninput = () => {
    console.log("Works!");
    if(classWizardRadioButton.checked){
        characterPicture.src = "../images/portraits/23.png";
    }
}

//----------------------------------------------------------------
// Setting init values
//----------------------------------------------------------------
characterNameText.innerHTML = null; // Setting the CharacterNameText to no Text -> If this does not launch then the Text will be {ERROR}.
classWarriorRadioButton.checked = true; // Set the Warrior as default selection.
characterPicture.src = "../images/portraits/24.png"; // Set the Warrior portrait as default.

//----------------------------------------------------------------
// Clientside script load text
//----------------------------------------------------------------
console.log("Character creation %c clientside Script %c has been %c sucessfully %c loaded", "color: yellow;", "color: none;", "color: green;", "color: none;");

//----------------------------------------------------------------
// Exports
//----------------------------------------------------------------
exports = {characterNameText, characterNameInput, characterCodeInput, characterPicture, classWarriorRadioButton, classWizardRadioButton, classArcherRadioButton, currentServerText, currentServerUsers};