/*

Simple Clientside Script for character creation Page
by Lenzork

written on 12/02/2022


*/

//----------------------------------------------------------------
// Declaration of elements
//----------------------------------------------------------------
allElements = {}

allElements.characterNameText = document.getElementById("characterNameTop");
allElements.characterNameInput = document.getElementById("characterNameInput");
allElements.characterPicture = document.getElementById("characterPicture");
allElements.classWarriorRadioButton = document.getElementById("radio1");
allElements.classWizardRadioButton = document.getElementById("radio2");
allElements.classArcherRadioButton = document.getElementById("radio3");

//----------------------------------------------------------------
// Functions
//----------------------------------------------------------------
allElements.characterNameInput.onkeydown, allElements.characterNameInput.onkeyup = () => {
    allElements.characterNameText.innerHTML = allElements.characterNameInput.value;
}

allElements.classArcherRadioButton.oninput = () => {
    console.log("Works!");
    if(allElements.classArcherRadioButton.checked){
        allElements.characterPicture.src = "../images/portraits/28.png";
    }
}

allElements.classWarriorRadioButton.oninput = () => {
    console.log("Works!");
    if(allElements.classWarriorRadioButton.checked){
        allElements.characterPicture.src = "../images/portraits/24.png";
    }
}

allElements.classWizardRadioButton.oninput = () => {
    console.log("Works!");
    if(allElements.classWizardRadioButton.checked){
        allElements.characterPicture.src = "../images/portraits/23.png";
    }
}

//----------------------------------------------------------------
// Setting init values
//----------------------------------------------------------------
allElements.characterNameText.innerHTML = null; //Setting the CharacterNameText to no Text -> If this does not launch then the Text will be {ERROR}.

//----------------------------------------------------------------
// Clientside script load text
//----------------------------------------------------------------
console.log("Character creation %c clientside Script %c has been %c sucessfully %c loaded", "color: yellow;", "color: none;", "color: green;", "color: none;");