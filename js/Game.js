/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

 class Game {
     constructor() {
         this.missed = 0;
         this.phrases = [
            new Phrase('rise and shine'),
            new Phrase('cold as ice'),
            new Phrase('karl the fog'),
            new Phrase('its a scorcher'),
            new Phrase('raining cats and dogs')
         ];
         this.activePhrase = null;
     }

     /**
     * Selects random phrase from phrases property
     * @return {Object} Phrase object chosen to be used
     */
     getRandomPhrase() {
         // retrieves one of the phrases stored in the phrases array and returns it
         const randomValue = Math.floor(Math.random() * this.phrases.length);
         return this.phrases[randomValue];
     }

     /**
     * Puts game in playable state by hiding overlay, selecting a random phrase, and displaying the phrase to the display
     */
     startGame() {
        // hides start screen overlay
        $('#overlay').hide();

         // calls getRandomPhrase() method
        const gamePhrase = this.getRandomPhrase();

        //  // sets activePhrase to chosen phrase
        this.activePhrase = gamePhrase;

        //  // adds that phrase to addPhraseToDisplay() method
        gamePhrase.addPhraseToDisplay();
     }

     /**
     * Handles either the "mousedown" or "keydown" event
     * @param {e} Event The event object
     */
     handleInteraction(e) {
         // determine the selected letter's element based on the event type
         let selectedLetterElement;
         if (e.type === 'click') {
            selectedLetterElement = e.target;
         } else if (e.type === 'keydown' && /^[a-z]$/.test(e.key)) {
             const selectedLetter = e.key;
             const allLetterElements = document.querySelectorAll('#qwerty button');
             let allLetterArray= [...allLetterElements];
             selectedLetterElement = allLetterArray.find(letterElement => selectedLetter === letterElement.textContent);
         } else {
             return false;
         }
         //checks if button clicked by player matches a letter in the phrase
         const doesMatch = this.activePhrase.checkLetter(selectedLetterElement);
         
         //disable selected letter's onscreen button
         selectedLetterElement.disabled = true;

         //if phrase includes guessed letter, add chosen CSS class to selected to button, call showMatchedLetter(), call checkForWin().
         //if phrase does not include guessed letter, add 'wrong' CSS class to keyboard button and call removeLife()
         if (doesMatch) {
            this.activePhrase.showMatchedLetter(selectedLetterElement);
             selectedLetterElement.className = 'chosen';
             this.checkForWin();
             if (this.checkForWin()) {

                 //if player has won the game, call gameOver() method
                 this.gameOver();
             }
         } else {
             selectedLetterElement.className = 'wrong';
             this.removeLife();
         }
     }

     /**
     * Removes a heart from board and increments count of missed letters
     */
     removeLife() {
        //increments the missed property
         this.missed += 1;
         
        // replaces one of the liveHeart.png images with a lostHeart.png image
         let hearts = document.querySelectorAll('.tries img');
         let heartsArray = [...hearts];
         
         let liveHearts = heartsArray.filter(heart => /liveHeart/.test(heart.src));
         liveHearts[0].src = "images/lostHeart.png";

         //if player has 5 missed guesses then end game with gameOver()
         if (this.missed === 5) {
             this.gameOver();
         }
     }

     /**
     * Checks if a player has won by exposing all the phrase's letters
     * @return {boolean} - whether the player won or not
     */
     checkForWin() {
         // return true if there are no more exposed phrase letters
         let unexposedLetters = document.querySelectorAll('#phrase .hide');
         const unexposedLettersArray = [...unexposedLetters];
         if (unexposedLetters.length === 0) {
             return true;
         } else {
             return false;
         }
     }

     /**
     * Puts the game in a "game over" state based on whether the player won or lost
     * and resets the board for the next game.
     */
     gameOver() {
         //displays the original start screen overlay
        $('#overlay').show();
        document.querySelector("#btn__reset").textContent = 'Play again?';
         //depending on the outcome of the game update the overlay h1 with win or lose message
        const gameOverMessage = document.querySelector('#game-over-message');
        if (this.checkForWin()) {  
            gameOverMessage.textContent = 'YOU WON!';
            document.querySelector('#overlay').className = 'win';
        } else {
            gameOverMessage.textContent = 'Sadly, you lost.';
            document.querySelector('#overlay').className = 'lose';
        }
        
        // ----- reset the game ------
        // reset the phrase tokens
        let phraseParent = document.querySelector('#phrase ul');
        phraseParent.innerHTML = '';

        // reset the letter choices
        let letterChoice = document.querySelectorAll('#qwerty button');
        letterChoice.forEach(letter => {
            letter.className = 'key';
            letter.disabled = false;
        });

        // reset the heart images
        let hearts = document.querySelectorAll('.tries img');
        let heartsArray = [...hearts];
        let liveHearts = heartsArray.forEach(heart => heart.src = "images/liveHeart.png");

        // reset this.missed
        this.missed = 0;
     }
 }