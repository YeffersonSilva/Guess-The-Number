// main.js

// Declaración global
let game;

document.addEventListener("DOMContentLoaded", function() {
    // Inicialización
    game = new NumberGuessingGame(10, 0.1);
    game.init();
});
