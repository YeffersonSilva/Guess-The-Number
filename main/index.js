let computerNumber;
let userNumbers = [];
let attemps = 0;
let maxguesses = 10;


//Funcion de inicio , numero aleatorios
function init() {
  computerNumber = Math.floor(Math.random() * 100 + 1);
 // console.log(computerNumber);
}

function compareNumbers() {
  const userNumber = Number(document.getElementById("inputBox").value);
  userNumbers.push(" " + userNumber);
  document.getElementById("guesses").innerHTML = userNumbers;

    if (attemps < maxguesses) {
    
        if (userNumber > computerNumber) {
            document.getElementById("textOutput").innerHTML = "Too high";
            document.getElementById("inputBox").value = "";
            attemps++;
            document.getElementById("attempts").innerHTML = attemps;
        } else if (userNumber < computerNumber) {
            document.getElementById("textOutput").innerHTML = "Too low";
            document.getElementById("inputBox").value = "";
            attemps++;
            document.getElementById("attempts").innerHTML = attemps;
        } else {
            document.getElementById("textOutput").innerHTML = "You win!";
            attemps++;
            document.getElementById("attempts").innerHTML = attemps;
        }
    }
    else {
        document.getElementById("textOutput").innerHTML = "You lose! The computer user: " + computerNumber;
        
     }
    
}
