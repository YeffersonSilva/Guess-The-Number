let computerNumber;
let userNumbers = [];
let attempts = 0;
const maxGuesses = 10;
const proximityThreshold = 0.1; // 10%

function init() {
    computerNumber = generateRandomNumber(1000, 9999);
    console.log(computerNumber);
}

function newGame() {
    window.location.reload();
}

function compareNumbers() {
    const userNumber = getUserNumber();

    if (isValidNumber(userNumber)) {
        userNumbers.push(userNumber);
        updateGuessesDisplay();
        
        if (attempts < maxGuesses) {
            handleGuess(userNumber);
        } else {
            endGame("You lose! The computer used: " + computerNumber);
        }
    } else {
        alert("Enter a 4-digit number.");
        clearInputBox();
    }
}

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getUserNumber() {
    return Number(document.getElementById("inputBox").value);
}

function isValidNumber(number) {
    return number >= 1000 && number <= 9999;
}

function updateGuessesDisplay() {
    document.getElementById("guesses").innerHTML = userNumbers.join(" ");
}

function handleGuess(userNumber) {
    if (userNumber > computerNumber) {
        updateOutput("Too high");
        checkProximity(userNumber);
    } else if (userNumber < computerNumber) {
        updateOutput("Too low");
        checkProximity(userNumber);
    } else {
        endGame("You win!");
    }
    
    attempts++;
    updateAttemptsDisplay();

    if (userNumber === computerNumber) {
        document.getElementById("inputBox").setAttribute("readonly", "readonly");
    }
}

function checkProximity(userNumber) {
    const difference = Math.abs(computerNumber - userNumber);
    const thresholdValue = computerNumber * proximityThreshold;

    if (difference <= thresholdValue) {
        if (userNumber > computerNumber) {
            updateOutput("A bit lower");
        } else {
            updateOutput("A bit higher");
        }
    }
}

function updateOutput(message) {
    document.getElementById("textOutput").innerHTML = message;
    clearInputBox();
}

function endGame(message) {
    updateOutput(message);
    document.getElementById("inputBox").setAttribute("readonly", "readonly");
}

function clearInputBox() {
    document.getElementById("inputBox").value = "";
}

function updateAttemptsDisplay() {
    document.getElementById("attempts").innerHTML = attempts;
}
