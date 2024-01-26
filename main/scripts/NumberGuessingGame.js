// NumberGuessingGame.js

class NumberGuessingGame {
    constructor(maxGuesses, proximityThreshold) {
        this.maxGuesses = maxGuesses;
        this.proximityThreshold = proximityThreshold;
        this.computerNumber = null;
        this.userNumbers = [];
        this.attempts = 0;
    }

    init() {
        const selectElement = document.getElementById("numOfDigits");
        const selectedOption = selectElement.options[selectElement.selectedIndex];
        const numOfDigits = parseInt(selectedOption.value, 10);
        const minNumber = Math.pow(10, numOfDigits - 1);
        const maxNumber = Math.pow(10, numOfDigits) - 1;
        this.computerNumber = this.generateRandomNumber(minNumber, maxNumber);
        console.log(this.computerNumber);
    }

    newGame() {
        window.location.reload();
    }

    compareNumbers() {
        const userNumber = this.getUserNumber();

        if (this.isValidNumber(userNumber)) {
            this.userNumbers.push(userNumber);
            this.updateGuessesDisplay();

            if (this.attempts < this.maxGuesses) {
                this.handleGuess(userNumber);
            } else {
                this.endGame("Você perdeu! O computador usou: " + this.computerNumber);
            }
        } else {
            alert("Insira um número válido.");
            this.clearInputBox();
        }
    }

    generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    getUserNumber() {
        return Number(document.getElementById("inputBox").value);
    }

    isValidNumber(number) {
        const selectElement = document.getElementById("numOfDigits");
        const numOfDigits = parseInt(selectElement.value, 10);
        const numString = number.toString();
        return !isNaN(number) && numString.length === numOfDigits;
    }

    updateGuessesDisplay() {
        document.getElementById("guesses").innerHTML = this.userNumbers.join(" ");
    }

    handleGuess(userNumber) {
        const selectElement = document.getElementById("numOfDigits");
        const selectedOption = selectElement.options[selectElement.selectedIndex];
        const numOfDigits = parseInt(selectedOption.value, 10);
        const minNumber = Math.pow(10, numOfDigits - 1);
        const maxNumber = Math.pow(10, numOfDigits) - 1;

        if (this.isValidNumber(userNumber, minNumber, maxNumber)) {
            if (userNumber > this.computerNumber) {
                this.updateOutput("Muito alto");
                this.checkProximity(userNumber);
            } else if (userNumber < this.computerNumber) {
                this.updateOutput("Muito baixo");
                this.checkProximity(userNumber);
            } else {
                this.endGame("Você ganhou!");
            }

            this.attempts++;
            this.updateAttemptsDisplay();

            if (userNumber === this.computerNumber) {
                document.getElementById("inputBox").setAttribute("readonly", "readonly");
            }
        } else {
            alert("Enter a valid number within the specified range.");
            this.clearInputBox();
        }
    }

    checkProximity(userNumber) {
        const difference = Math.abs(this.computerNumber - userNumber);
        const thresholdValue = this.computerNumber * this.proximityThreshold + 1;

        if (difference <= thresholdValue) {
            if (userNumber > this.computerNumber) {
                this.updateOutput("Um pouco mais baixo");
            } else {
                this.updateOutput("Um pouco mais alto");
            }
        }
    }

    updateOutput(message) {
        document.getElementById("textOutput").innerHTML = message;
        this.clearInputBox();
    }

    endGame(message) {
        this.updateOutput(message);
        document.getElementById("inputBox").setAttribute("readonly", "readonly");
    }

    clearInputBox() {
        document.getElementById("inputBox").value = "";
    }

    updateAttemptsDisplay() {
        document.getElementById("attempts").innerHTML = this.attempts;
    }
}
