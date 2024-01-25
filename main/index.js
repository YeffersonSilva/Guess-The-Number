let computerNumber;
let userNumbers = [];
let attempts = 0;
const maxGuesses = 10;
const proximityThreshold = 0.1; // 10%

function init() {
    const selectElement = document.getElementById("numOfDigits");
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const numOfDigits = parseInt(selectedOption.value, 10);

    const minNumber = 10 ** (numOfDigits - 1);
    const maxNumber = 10 ** numOfDigits - 1;

    computerNumber = generateRandomNumber(minNumber, maxNumber);
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
            endGame("Você perdeu! O computador usou: " + computerNumber);
        }
    } else {
        alert("Insira um número válido.");
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
    const selectElement = document.getElementById("numOfDigits");
    const numOfDigits = parseInt(selectElement.value, 10);
    
    const numString = number.toString();
    return !isNaN(number) && numString.length === numOfDigits;
}



function updateGuessesDisplay() {
    document.getElementById("guesses").innerHTML = userNumbers.join(" ");
}

function handleGuess(userNumber) {
    const selectElement = document.getElementById("numOfDigits");
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const numOfDigits = parseInt(selectedOption.value, 10);

    const minNumber = 10 ** (numOfDigits - 1);
    const maxNumber = 10 ** numOfDigits - 1;

    if (isValidNumber(userNumber, minNumber, maxNumber)) {
        if (userNumber > computerNumber) {
            updateOutput("Muito alto");
            checkProximity(userNumber);
        } else if (userNumber < computerNumber) {
            updateOutput("Muito baixo");
            checkProximity(userNumber);
        } else {
            endGame("Você ganhou!");
        }

        attempts++;
        updateAttemptsDisplay();

        if (userNumber === computerNumber) {
            document.getElementById("inputBox").setAttribute("readonly", "readonly");
        }
    } else {
        alert("Enter a valid number within the specified range.");
        clearInputBox();
    }
}

function checkProximity(userNumber) {
    const difference = Math.abs(computerNumber - userNumber);
    const thresholdValue = (computerNumber * proximityThreshold) + 1;

    if (difference <= thresholdValue) {
        if (userNumber > computerNumber) {
            updateOutput("Um pouco mais baixo");
        } else {
            updateOutput("Um pouco mais alto");
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
