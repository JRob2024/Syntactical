import { WORDS } from "./words.js";

const NUMBER_OF_GUESSES = 5;
let guessesRemaining = NUMBER_OF_GUESSES;



// Get the textbox and button elements
var enterButton = document.getElementById("enterButton");

// Define the correct word
var correctWord1 = "zebra";
var correctWord2 = "green";

// Get references to the textboxes and enter button
var textbox1 = document.getElementById("textbox1");
var textbox2 = document.getElementById("textbox2");
var keyboard1Cont = document.getElementById("keyboard1-cont");
var keyboard2Cont = document.getElementById("keyboard2-cont");
// Get the element where you want to display the remaining guesses count
var guessesRemainingDisplay = document.getElementById("guessesRemainingDisplay");
// Update the content of the element with the remaining guesses count
guessesRemainingDisplay.textContent = "Guesses Remaining: " + guessesRemaining;

// Add an event listener to the textbox for the click event
textbox1.addEventListener("click", function() {
    // Focus on the textbox when it's clicked
    textbox1.focus();
    keyboard1Cont.style.display = "block";
    keyboard2Cont.style.display = "none";
    showKeyboard("keyboard1-cont");
});

// Add an event listener to the textbox for the click event
textbox2.addEventListener("click", function() {
    // Focus on the textbox when it's clicked
    textbox2.focus();
    keyboard2Cont.style.display = "block";
    keyboard1Cont.style.display = "none";
    showKeyboard("keyboard2-cont");
});


// Add event listeners to the enter button
enterButton.addEventListener("click", function() {
    // Get the values from the textboxes
    var input1 = textbox1.value.toLowerCase();
    var input2 = textbox2.value.toLowerCase();
    guessesRemaining = guessesRemaining - 1;
    updateGuessesRemainingDisplay(); // Update the display of remaining guesses

    if (guessesRemaining === 0) {
        toastr.error("Game over!")
        disableAllControls();
    } else if ((input1.length < 5 && input1.length != 0) || input1.length > 5){
        toastr.error("Word 1 does not have 5 letters!")
        return
    } else if ((input2.length < 5 && input2.length != 0) || input2.length > 5){
        toastr.error("Word 2 does not have 5 letters!")    
        return
    } else if (!WORDS.includes(input1) && input1.length != 0) {
        toastr.error("Word 1 not in list!")
        return
    } else if (!WORDS.includes(input2) && input2.length != 0) {
        toastr.error("Word 2 not in list!")
        return   
    } else {
        // Compare each letter of the inputs with the corresponding letter of the correct word
        var isCorrect1 = compareInputs1(input1, correctWord1);
        //compareInputs11(input1, correctWord1);
        var isCorrect2 = compareInputs2(input2, correctWord2);
        //compareInputs22(input2, correctWord2);
        compareInputs(input1, correctWord1, "#keyboard1-cont button");
        compareInputs(input2, correctWord2, "#keyboard2-cont button");

        // Provide feedback based on the comparison result
        if (isCorrect1 && isCorrect2) {
            toastr.success("You guessed right! Game over!")
            disableAllControls();
            return
        } else if (isCorrect1) {
            toastr.success("The first word is correct!")
            return
        } else if (isCorrect2) {
            toastr.success("The second word is correct!")
            return
        } else {
            toastr.error("Neither input is correct!")
            return
        }
    }

});


function compareInputs(input, correctWord, selector) {
    const correctLettersSet = new Set(correctWord);
    const guessedLettersSet = new Set(input.split('')); // Convert input to a set for efficient checking

    // Remove any existing highlighting from the keyboard buttons
    const allKeys = document.querySelectorAll(selector);
    allKeys.forEach(key => {
        key.classList.remove('green', 'yellow');
    });

    // Iterate over all keyboard buttons and update their classes
    allKeys.forEach(key => {
        const letter = key.dataset.letter.toLowerCase();

        if (guessedLettersSet.has(letter)) {
            if (correctLettersSet.has(letter)) {
                if (input.indexOf(letter) === correctWord.indexOf(letter)) {
                    key.classList.add('green');
                } else {
                    key.classList.add('yellow');
                }
            } else {
                key.classList.add('grey');
            }
        }
    });
}

// Function to compare each letter of the input with the corresponding letter of the correct word
function compareInputs1(input, correctWord1) {
    for (var i = 0; i < correctWord1.length; i++) {
        if (input[i] !== correctWord1[i]) {
            return false;
        }
    }
    return true;
}

function compareInputs2(input, correctWord2) {
    for (var i = 0; i < correctWord2.length; i++) {
        if (input[i] !== correctWord2[i]) {
            return false;
        }
    }
    return true;
}

// Function to insert a character into a textbox
function insertCharacter(char) {
    // Get the textbox element
    var textbox = document.getElementById("textbox1");
    // Append the character to the textbox value
    if (char != "Del"){
        textbox.value += char;
    }
}

// Attach event listeners to the keyboard buttons
document.addEventListener("DOMContentLoaded", function() {
    var keyboardButtons = document.querySelectorAll("#keyboard1-cont button");
    keyboardButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            // Get the character associated with the button
            var char = this.textContent;
            // Insert the character into the textbox
            insertCharacter(char);
        });
    });
});

// Function to insert a character into a textbox
function insertCharacter2(char) {
    // Get the textbox element
    var textbox = document.getElementById("textbox2");
    // Append the character to the textbox value
    if (char != "Del"){
        textbox.value += char;
    }
}

// Attach event listeners to the keyboard buttons
document.addEventListener("DOMContentLoaded", function() {
    var keyboardButtons = document.querySelectorAll("#keyboard2-cont button");
    keyboardButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            // Get the character associated with the button
            var char = this.textContent;
            // Insert the character into the textbox
            insertCharacter2(char);
        });
    });
});

function disableAllControls() {
    var allButtons = document.querySelectorAll("button");
    allButtons.forEach(function(button) {
        button.disabled = true;
    });
    
    textbox1.disabled = true;
    textbox2.disabled = true;
}

function updateGuessesRemainingDisplay() {
    var guessesRemainingDisplay = document.getElementById("guessesRemainingDisplay");
    guessesRemainingDisplay.textContent = "Guesses Remaining: " + guessesRemaining;
}


function showKeyboard(keyboardId) {
    // Hide all keyboard containers
    var keyboardContainers = document.querySelectorAll('.keyboard-cont');
    keyboardContainers.forEach(function(container) {
        container.style.display = 'none';
    });

    // Show the selected keyboard container
    var keyboardContainer = document.getElementById(keyboardId);
    keyboardContainer.style.display = 'block';
    
    // Position the keyboard container absolutely relative to the document body or another parent container
    keyboardContainer.style.position = 'absolute';
    keyboardContainer.style.top = '50px'; // Adjust as needed

}




