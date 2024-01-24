let computerNumber;
let userNumbers = [];
let attempts = 0; // Corregí aquí de attemps a attempts
let maxGuesses = 10; // Corregí aquí de maxguesses a maxGuesses

// Funcion de inicio, número aleatorio
function init() {
    // Generar un número aleatorio entre 1000 y 9999 (ambos incluidos)
    computerNumber = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
    console.log(computerNumber);
}


function newGame() {
    window.location.reload();
}

function compareNumbers() {
    const userNumber = Number(document.getElementById("inputBox").value);

    // Verificar que el número tenga exactamente 4 cifras
    if (userNumber >= 1000 && userNumber <= 9999) {
        userNumbers.push(" " + userNumber);
        document.getElementById("guesses").innerHTML = userNumbers;

        if (attempts < maxGuesses) {
            if (userNumber > computerNumber) {
                document.getElementById("textOutput").innerHTML = "Too high";
                document.getElementById("inputBox").value = "";
                attempts++;
                document.getElementById("attempts").innerHTML = attempts;
            } else if (userNumber < computerNumber) {
                document.getElementById("textOutput").innerHTML = "Too low";
                document.getElementById("inputBox").value = "";
                attempts++;
                document.getElementById("attempts").innerHTML = attempts;
            } else {
                document.getElementById("textOutput").innerHTML = "You win!";
                attempts++;
                document.getElementById("attempts").innerHTML = attempts;
                document.getElementById("inputBox").setAttribute("readonly", "readonly");
            }
        } else {
            document.getElementById("textOutput").innerHTML = "You lose! The computer used: " + computerNumber;
            document.getElementById("inputBox").setAttribute("readonly", "readonly");
        }
    } else {
        alert("Enter a 4-digit number.");
        document.getElementById("inputBox").value = ""; // Limpiar el campo de entrada
    }
}
