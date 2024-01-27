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
        console.log("Número generado: " + this.computerNumber); // Para depuración

    }

    newGame() {
        window.location.reload();
    }

    compareNumbers() {
        const userInput = this.getUserNumber();

        if (userInput.includes('-') || userInput.includes('+')) {
            alert("Por favor, ingrese solo números enteros positivos.");
            this.clearInputBox();
            return;
        }

        const userNumber = Number(userInput);

        if (this.isValidNumber(userNumber)) {
            this.userNumbers.push(userNumber);
            this.updateGuessesDisplay();

            if (this.attempts < this.maxGuesses) {
                this.handleGuess(userNumber);
            } else {
                this.endGame("Você perdeu! O computador usou: " + this.computerNumber);
            }
        } else {
            alert("Por favor, ingrese solo números enteros.");
            this.clearInputBox();
        }
    }

    generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    getUserNumber() {
        return document.getElementById("inputBox").value.trim();
    }

    isValidNumber(number) {
        if (isNaN(number) || !Number.isInteger(number)) {
            return false;
        }

        const selectElement = document.getElementById("numOfDigits");
        const numOfDigits = parseInt(selectElement.value, 10);
        const numString = number.toString();
        return numString.length === numOfDigits;
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

        // Convertir userNumber a número para comparaciones
        const userNumAsNumber = parseInt(userNumber, 10);

        if (this.isValidNumber(userNumber, minNumber, maxNumber)) {
            if (userNumAsNumber > this.computerNumber) {
                this.updateOutput("Muito alto");
                this.checkProximity(userNumber);
            } else if (userNumAsNumber < this.computerNumber) {
                this.updateOutput("Muito baixo");
                this.checkProximity(userNumber);
            } else {
                this.endGame("Você ganhou!");
            }

            this.attempts++;
            this.updateAttemptsDisplay();

            if (userNumAsNumber === this.computerNumber) {
                document.getElementById("inputBox").setAttribute("readonly", "readonly");
            }
        } else {
            alert("Enter a valid number within the specified range.");
            this.clearInputBox();
        }
    }

    checkProximity(userNumber) {
        const difference = Math.abs(this.computerNumber - parseInt(userNumber, 10));
        const thresholdValue = this.computerNumber * this.proximityThreshold + 1;

        if (difference <= thresholdValue) {
            if (parseInt(userNumber, 10) > this.computerNumber) {
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
