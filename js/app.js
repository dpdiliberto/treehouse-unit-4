/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

// instantiate a new game object
const game = new Game();

// add event listener to start game when button is selected
const buttonStartGame = document.querySelector('#btn__reset');
buttonStartGame.addEventListener('mousedown', function() {
    game.startGame();
});

// add event listener to call handleInteraction() method on letter buttons
const letterButtons = document.querySelectorAll('#qwerty button');
for (button of letterButtons) {
    button.addEventListener('click', (e) => {
        game.handleInteraction(e);
    });
};

// add event listener to call handleInteraction() method in response to keydown events
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && buttonStartGame.parentNode.style.display !== 'none') {
        game.startGame();
    } else if (/^[a-z]$/.test(e.key) && buttonStartGame.parentNode.style.display === 'none') {
        game.handleInteraction(e);
    }
});