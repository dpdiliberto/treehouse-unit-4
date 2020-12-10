 /* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

 class Phrase {
    constructor(phrase) {
        this.phrase = phrase.split("");
    }

     /**
     * Adds phrase object's letter placeholders to the screen
     */
    addPhraseToDisplay() {
        let phraseUL = document.querySelector('#phrase ul');
        
        let phraseHTML = '';
        this.phrase.forEach(character => {
            // test if character is a letter or space, and add html to phraseUL accordingly
            if (/[a-z]/.test(character)){
                phraseHTML = `<li class="hide letter ${character}">${character}</li>`;
                phraseUL.insertAdjacentHTML('beforeend', phraseHTML);

            } else if (/\s/.test(character)) {
                phraseHTML = `<li class="space"> </li>`;
                phraseUL.insertAdjacentHTML('beforeend', phraseHTML);
            }
        });
    }

     /**
     * Checks whether the selected letter matches one or more letters in the phrase
     * @param {selectedLetterElement} button - The selected button element
     * @return {boolean} boolean - Whether the selected letter is in the phrase
     */
    checkLetter(selectedLetterElement) {
        const selectedLetter = selectedLetterElement.textContent;
        const matchingLetter = this.phrase.filter(character => character === selectedLetter);
        if (matchingLetter.length > 0) {
            return true;
        } else {
            return false;
        }
    }

     /**
     * Reveals the letter that the placeholder represents
     * @param {selectedLetterElement} button - The selected button element
     * @return {boolean} boolean - Whether the selected letter is in the phrase
     */
    showMatchedLetter(selectedLetterElement) {
        const letterLIs = document.querySelectorAll('#phrase ul li');

        // search letterLIs class names and replace each 'hide' class with 'show' class
        letterLIs.forEach(li => {
            if (li.className === `hide letter ${selectedLetterElement.textContent}`) {
                li.className = 'show';
            }
        })
    }
 }